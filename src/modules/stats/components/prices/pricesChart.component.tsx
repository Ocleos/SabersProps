import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import type { EChartsOption, SeriesOption } from 'echarts';
import { BarChart, ScatterChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { type ECharts, init, use } from 'echarts/core';
import { get } from 'radash';
import { useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import type { PricesInfosData } from '~src/modules/stats/models/pricesInfosData.model';
import { colorsTheme, fontFamily } from '~src/theme/nativewind.theme';
import { useColorScheme } from '~src/theme/useColorTheme.theme';
import { formatToCurrency } from '~src/utils/format.utils';
import { pricesChartSeries } from './pricesChart.utils';

interface IPricesChartProps {
  data: PricesInfosData[];
}

use([SVGRenderer, BarChart, GridComponent, TooltipComponent, ScatterChart]);

const PricesChart: React.FC<IPricesChartProps> = ({ data }) => {
  const { width } = useWindowDimensions();
  const svgRef = useRef<HTMLElement>(null);

  const { colorScheme } = useColorScheme();

  const paddingCard = 64; // ($4 (Layout) + $4 (Card)) * 2
  const maxWidth = width - paddingCard;
  const height = data.length * 50;

  useEffect(() => {
    const option: EChartsOption = {
      backgroundColor: 'transparent',
      animationEasing: 'circularOut',
      grid: {
        top: 16,
        bottom: 16,
        right: 16,
        left: 16,
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        valueFormatter: (value) => (value ? formatToCurrency(Number(value)) : '--'),
      },
      textStyle: {
        fontFamily: fontFamily.exo2,
      },
      xAxis: {
        type: 'value',
        position: 'top',
      },
      yAxis: {
        type: 'category',
        data: data.map((value) => value.name),
        inverse: true,
      },
      series: pricesChartSeries.map((entry) => {
        return {
          name: entry.label,
          type: entry.isVisible ? 'bar' : 'scatter',
          stack: entry.isVisible ? 'prices' : entry.property,
          symbolSize: entry.property === 'total' ? 0 : 10,
          itemStyle: {
            borderWidth: 1,
            color: get(colorsTheme, `${entry.color}.200`),
            borderColor: get(colorsTheme, `${entry.color}.500`),
          },
          data: data.map((value) => get(value, entry.property)),
        } as SeriesOption;
      }),
    };

    let chart: ECharts;
    if (svgRef.current) {
      chart = init(svgRef.current, colorScheme, {
        renderer: 'svg',
        width: maxWidth,
        height: height,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [colorScheme, maxWidth, height, data]);

  return <SvgChart ref={svgRef} />;
};

export default PricesChart;

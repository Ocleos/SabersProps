import { fontFamily, THEME, useColorScheme } from '@sabersprops/ui';
import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';
import type { EChartsOption, SeriesOption } from 'echarts';
import { BarChart, ScatterChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { type ECharts, init, use } from 'echarts/core';
import { get } from 'radash';
import { useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import type { PricesInfosData } from '~src/modules/stats/models/pricesInfosData.model';
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
      animationEasing: 'circularOut',
      backgroundColor: 'transparent',
      grid: {
        bottom: 16,
        containLabel: true,
        left: 16,
        right: 16,
        top: 16,
      },
      series: pricesChartSeries.map((entry) => {
        return {
          data: data.map((value) => get(value, entry.property)),
          itemStyle: {
            borderColor: get(THEME.colors, `${entry.color}.500`),
            borderWidth: 1,
            color: get(THEME.colors, `${entry.color}.200`),
          },
          name: entry.label,
          stack: entry.isVisible ? 'prices' : entry.property,
          symbolSize: entry.property === 'total' ? 0 : 10,
          type: entry.isVisible ? 'bar' : 'scatter',
        } as SeriesOption;
      }),
      textStyle: {
        fontFamily: fontFamily.exo2,
      },
      tooltip: {
        trigger: 'axis',
        valueFormatter: (value) => (value ? formatToCurrency(Number(value)) : '--'),
      },
      xAxis: {
        position: 'top',
        type: 'value',
      },
      yAxis: {
        data: data.map((value) => value.name),
        inverse: true,
        type: 'category',
      },
    };

    let chart: ECharts;
    if (svgRef.current) {
      chart = init(svgRef.current, colorScheme, {
        height: height,
        renderer: 'svg',
        width: maxWidth,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [colorScheme, maxWidth, height, data]);

  return <SvgChart ref={svgRef} />;
};

export default PricesChart;

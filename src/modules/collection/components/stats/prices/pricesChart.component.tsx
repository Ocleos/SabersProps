import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';
import type { EChartsOption, SeriesOption } from 'echarts';
import { BarChart, ScatterChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { type ECharts, init, use } from 'echarts/core';
import { useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import type { PricesInfosData } from '~src/modules/collection/types/pricesInfosData.type';
import { getRGBColor } from '~src/theme/colors.theme';
import { useColorScheme } from '~src/theme/useColorScheme.hooks';
import { formatToCurrency } from '~src/utils/format.utils';
import { pricesChartSeries } from './pricesChart.utils';

type PricesChartProps = {
  data: PricesInfosData[];
};

use([SVGRenderer, BarChart, GridComponent, TooltipComponent, ScatterChart]);

const PricesChart: React.FC<PricesChartProps> = ({ data }) => {
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
        left: 16,
        right: 16,
        top: 16,
      },
      series: pricesChartSeries.map((entry) => {
        return {
          data: data.map((value) => value[entry.property as keyof PricesInfosData]),
          itemStyle: {
            borderColor: getRGBColor(entry.color.border),
            borderWidth: 1,
            color: getRGBColor(entry.color.bg),
          },
          name: entry.label,
          stack: entry.isVisible ? 'prices' : entry.property,
          symbolSize: entry.property === 'total' ? 0 : 10,
          type: entry.isVisible ? 'bar' : 'scatter',
        } as SeriesOption;
      }),
      textStyle: {
        fontFamily: 'Exo2_400Regular',
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

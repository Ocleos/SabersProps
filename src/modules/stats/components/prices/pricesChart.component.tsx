import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import type { EChartsOption } from 'echarts';
import { BarChart, ScatterChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { get, map } from 'lodash';
import { useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import { colorsTheme, fontFamily } from '~src/theme/nativewind.theme';
import { useColorScheme } from '~src/theme/useColorTheme.theme';
import { formatToCurrency } from '~src/utils/format.utils';
import type { PricesInfosData } from '../../models/pricesInfosData.model';
import { pricesChartSeries } from './pricesChart.utils';

interface IPricesChartProps {
  data: PricesInfosData[];
}

echarts.use([SVGRenderer, BarChart, GridComponent, TooltipComponent, ScatterChart]);

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
        data: map(data, 'name'),
        inverse: true,
      },
      series: map(pricesChartSeries, (entry) => {
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
          data: map(data, entry.property),
        };
      }),
    };

    let chart: echarts.ECharts;
    if (svgRef.current) {
      chart = echarts.init(svgRef.current, colorScheme, {
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

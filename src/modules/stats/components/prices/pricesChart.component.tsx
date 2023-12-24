import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import { EChartsOption } from 'echarts';
import { BarChart, ScatterChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { get, map } from 'lodash';
import React, { useContext, useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import { gluestackUIConfig } from '~src/theme/gluestack-ui.config';
import { ThemeContext } from '~src/theme/themeContext.theme';
import { formatToCurrency } from '~src/utils/format.utils';
import { PricesInfosData } from '../../models/pricesInfosData.model';
import { pricesChartSeries } from './pricesChart.utils';

type PricesChartProps = {
  data: PricesInfosData[];
};

echarts.use([SVGRenderer, BarChart, GridComponent, TooltipComponent, ScatterChart]);

const PricesChart: React.FC<PricesChartProps> = ({ data }) => {
  const { width } = useWindowDimensions();
  const svgRef = useRef<HTMLElement>(null);

  const config = gluestackUIConfig;

  const { theme } = useContext(ThemeContext);

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
        fontFamily: 'Exo2_400Regular',
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
          symbolSize: 0,
          itemStyle: {
            borderWidth: 1,
            color: get(config.tokens.colors, `${entry.color}200`),
            borderColor: get(config.tokens.colors, `${entry.color}700`),
          },
          data: map(data, entry.property),
        };
      }),
    };

    let chart: echarts.ECharts;
    if (svgRef.current) {
      chart = echarts.init(svgRef.current, theme, {
        renderer: 'svg',
        width: maxWidth,
        height: height,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [theme, maxWidth, height, config, data]);

  return <SvgChart ref={svgRef} />;
};

export default PricesChart;

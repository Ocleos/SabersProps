import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import type { EChartsOption, SeriesOption } from 'echarts';
import { BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { get, keys, map } from 'lodash';
import { useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import { type PropState, propStates } from '~src/models/propState.model';
import { PropType, propTypes } from '~src/models/propType.model';
import { colorsTheme, fontFamily } from '~src/theme/nativewind.theme';
import { useColorScheme } from '~src/theme/useColorTheme.theme';
import type { StateRepartition } from '../../models/repartition.model';

echarts.use([SVGRenderer, BarChart, GridComponent]);

interface IRepartitionChartProps {
  data: StateRepartition;
}

const RepartitionChart: React.FC<IRepartitionChartProps> = ({ data }) => {
  const { width } = useWindowDimensions();
  const svgRef = useRef<HTMLElement>(null);

  const { colorScheme } = useColorScheme();

  const paddingCard = 64; // ($4 (Layout) + $4 (Card)) * 2
  const maxWidth = width - paddingCard;

  useEffect(() => {
    const option: EChartsOption = {
      backgroundColor: 'transparent',
      animationEasing: 'circularOut',
      grid: {
        top: 32,
        bottom: 16,
        right: 0,
      },
      textStyle: {
        fontFamily: fontFamily.exo2,
      },
      xAxis: {
        type: 'category',
        position: 'top',
        data: [propTypes[PropType.LIGHTSABER].label, propTypes[PropType.PROP].label, propTypes[PropType.COSTUME].label],
      },
      yAxis: {
        type: 'value',
        inverse: true,
      },
      series: map(keys(data), (stateData): SeriesOption => {
        const state: PropState = Number(stateData);

        return {
          type: 'bar',
          stack: 'total',
          itemStyle: {
            borderWidth: 1,
            color: get(colorsTheme, `${propStates[state].colorScheme}.200`),
            borderColor: get(colorsTheme, `${propStates[state].colorScheme}.500`),
          },
          name: propStates[state].label,
          data: data[state].values,
        };
      }),
    };

    let chart: echarts.ECharts;
    if (svgRef.current) {
      chart = echarts.init(svgRef.current, colorScheme, {
        renderer: 'svg',
        width: maxWidth,
        height: 300,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [colorScheme, maxWidth, data]);

  return <SvgChart ref={svgRef} />;
};

export default RepartitionChart;

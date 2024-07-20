import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import type { EChartsOption } from 'echarts';
import { PieChart } from 'echarts/charts';
import { TooltipComponent } from 'echarts/components';
import { type ECharts, init, use } from 'echarts/core';
import { get } from 'radash';
import { useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import { type PropState, propStates } from '~src/models/propState.model';
import { colorsTheme, fontFamily } from '~src/theme/nativewind.theme';
import { useColorScheme } from '~src/theme/useColorTheme.theme';
import type { StateRepartition } from '../../models/repartition.model';

use([SVGRenderer, PieChart, TooltipComponent]);

interface IRepartitionChartProps {
  data: StateRepartition;
  propType: string;
}

const RepartitionChart: React.FC<IRepartitionChartProps> = ({ data, propType }) => {
  const { width } = useWindowDimensions();
  const svgRef = useRef<HTMLElement>(null);

  const { colorScheme } = useColorScheme();

  const paddingCard = 64; // ($4 (Layout) + $4 (Card)) * 2
  const maxSize = width - paddingCard;

  useEffect(() => {
    const option: EChartsOption = {
      backgroundColor: 'transparent',
      animationEasing: 'circularOut',
      textStyle: {
        fontFamily: fontFamily.exo2,
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['40%', '90%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 5,
            borderWidth: 1,
          },
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: false,
            },
          },
          labelLine: {
            show: false,
          },
          data: Object.keys(data).map((stateData) => {
            const state: PropState = Number(stateData);

            const indexType = Number(propType) - 1;

            return {
              value: data[state].values[indexType],
              name: propStates[state].label,
              itemStyle: {
                color: get(colorsTheme, `${propStates[state].colorScheme}.200`),
                borderColor: get(colorsTheme, `${propStates[state].colorScheme}.500`),
              },
            };
          }),
        },
      ],
    };

    let chart: ECharts;
    if (svgRef.current) {
      chart = init(svgRef.current, colorScheme, {
        renderer: 'svg',
        width: maxSize,
        height: maxSize,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [colorScheme, maxSize, data, propType]);

  return <SvgChart ref={svgRef} />;
};

export default RepartitionChart;

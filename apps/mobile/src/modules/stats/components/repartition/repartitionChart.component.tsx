import { colorsTheme, fontFamily, useColorScheme } from '@sabersprops/ui';
import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';
import type { EChartsOption } from 'echarts';
import { PieChart } from 'echarts/charts';
import { TooltipComponent } from 'echarts/components';
import { type ECharts, init, use } from 'echarts/core';
import { get } from 'radash';
import { useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import { type PropState, propStates } from '~src/models/propState.model';
import type { StateRepartition } from '~src/modules/stats/models/repartition.model';

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
      animationEasing: 'circularOut',
      backgroundColor: 'transparent',
      series: [
        {
          avoidLabelOverlap: false,
          data: Object.keys(data).map((stateData) => {
            const state: PropState = Number(stateData);

            const indexType = Number(propType) - 1;

            return {
              itemStyle: {
                borderColor: get(colorsTheme, `${propStates[state].colorScheme}.500`),
                color: get(colorsTheme, `${propStates[state].colorScheme}.200`),
              },
              name: propStates[state].label,
              value: data[state].values[indexType],
            };
          }),
          emphasis: {
            label: {
              show: false,
            },
          },
          itemStyle: {
            borderRadius: 5,
            borderWidth: 1,
          },
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          name: '',
          radius: ['40%', '90%'],
          type: 'pie',
        },
      ],
      textStyle: {
        fontFamily: fontFamily.exo2,
      },
      tooltip: {
        trigger: 'item',
      },
    };

    let chart: ECharts;
    if (svgRef.current) {
      chart = init(svgRef.current, colorScheme, {
        height: maxSize,
        renderer: 'svg',
        width: maxSize,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [colorScheme, maxSize, data, propType]);

  return <SvgChart ref={svgRef} />;
};

export default RepartitionChart;

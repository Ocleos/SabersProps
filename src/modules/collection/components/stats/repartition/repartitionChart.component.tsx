import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';
import type { EChartsOption } from 'echarts';
import { PieChart } from 'echarts/charts';
import { TooltipComponent } from 'echarts/components';
import { use } from 'echarts/core';
import { Skeleton } from 'heroui-native/skeleton';
import { useMemo, useRef } from 'react';
import { View } from 'react-native';
import EmptyComponent from '~src/components/empty/empty.component';
import { type PropState, propStates } from '~src/modules/collection/types/propState.type';
import type { StateRepartition } from '~src/modules/collection/types/repartition.type';
import { getRGBColor } from '~src/theme/colors.theme';
import { useColorScheme } from '~src/theme/useColorScheme.hooks';
import { useChartWidth } from '../useChartWidth.hooks';
import { useEchartsLifecycle } from '../useEchartsLifecycle.hooks';
import { getRepartitionTotalForType } from './repartition.utils';

use([SVGRenderer, PieChart, TooltipComponent]);

type RepartitionChartProps = {
  data: StateRepartition;
  propType: string;
};

const RepartitionChart: React.FC<RepartitionChartProps> = ({ data, propType }) => {
  const svgRef = useRef<HTMLElement>(null);

  const { colorScheme } = useColorScheme();

  const maxSize = useChartWidth();
  const hasData = getRepartitionTotalForType(data, propType) > 0;

  const option = useMemo<EChartsOption | undefined>(() => {
    if (!hasData) {
      return undefined;
    }

    const indexType = Number(propType) - 1;

    return {
      animationEasing: 'circularOut',
      backgroundColor: 'transparent',
      series: [
        {
          avoidLabelOverlap: false,
          data: Object.keys(data).map((stateData) => {
            const state: PropState = Number(stateData);

            return {
              itemStyle: {
                borderColor: getRGBColor(propStates[state].colorScheme.border),
                color: getRGBColor(propStates[state].colorScheme.bg),
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
        fontFamily: 'Exo2_400Regular',
      },
      tooltip: {
        trigger: 'item',
      },
    };
  }, [data, propType, hasData]);

  const isReady = useEchartsLifecycle(svgRef, colorScheme, { height: maxSize, width: maxSize }, option);

  if (!hasData) {
    return <EmptyComponent />;
  }

  if (maxSize === 0) {
    return null;
  }

  return (
    <View style={{ height: maxSize, width: maxSize }}>
      <SvgChart ref={svgRef} />
      {!isReady && <Skeleton className='absolute inset-0 h-full w-full rounded-full' />}
    </View>
  );
};

export default RepartitionChart;

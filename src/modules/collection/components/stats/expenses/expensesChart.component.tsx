import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';
import type { EChartsOption } from 'echarts';
import { LineChart } from 'echarts/charts';
import { DataZoomComponent, GridComponent, TooltipComponent } from 'echarts/components';
import { use } from 'echarts/core';
import { Skeleton } from 'heroui-native/skeleton';
import { useMemo, useRef } from 'react';
import { View } from 'react-native';
import EmptyComponent from '~src/components/empty/empty.component';
import i18n from '~src/i18n.config';
import type { ExpensesData } from '~src/modules/collection/types/expense.type';
import { Colors, colors, getRGBColor } from '~src/theme/colors.theme';
import { useColorScheme } from '~src/theme/useColorScheme.hooks';
import { formatToCurrency } from '~src/utils/format.utils';
import { useChartWidth } from '../useChartWidth.hooks';
import { useEchartsLifecycle } from '../useEchartsLifecycle.hooks';
import { ExpensesTypes, getZoomByType } from './expenses.utils';

type ExpensesChartProps = {
  data: ExpensesData;
  type: ExpensesTypes;
};

use([SVGRenderer, LineChart, GridComponent, TooltipComponent, DataZoomComponent]);

const CHART_HEIGHT = 300;

const ExpensesChart: React.FC<ExpensesChartProps> = ({ type, data }) => {
  const svgRef = useRef<HTMLElement>(null);

  const { colorScheme } = useColorScheme();

  const maxWidth = useChartWidth();
  const hasData = data[type].length > 0;

  const option = useMemo<EChartsOption | undefined>(() => {
    if (!hasData) {
      return undefined;
    }

    return {
      animationEasing: 'circularOut',
      backgroundColor: 'transparent',
      dataZoom:
        type !== ExpensesTypes.GLOBAL_MONTHS
          ? [
              {
                end: 100,
                start: getZoomByType(type),
                type: 'inside',
              },
              {
                end: 100,
                start: getZoomByType(type),
              },
            ]
          : undefined,
      grid: {
        bottom: type !== ExpensesTypes.GLOBAL_MONTHS ? 64 : 32,
        left: 48,
        right: 0,
        top: 32,
      },
      series: [
        {
          data: data[type].map((value) => value.price),
          itemStyle: {
            color: getRGBColor(colors[Colors.PRIMARY].border),
          },
          name: i18n.t('stats:LABEL.PRICE'),
          sampling: 'lttb',
          symbol: 'circle',
          symbolSize: 6,
          type: 'line',
        },
        {
          data: data[type].map((value) => value.fees),
          itemStyle: {
            color: getRGBColor(colors[Colors.BLUE].border),
          },
          name: i18n.t('stats:LABEL.FEES'),
          sampling: 'lttb',
          symbol: 'diamond',
          symbolSize: 6,
          type: 'line',
        },
      ],
      textStyle: {
        fontFamily: 'Exo2_400Regular',
      },
      tooltip: {
        trigger: 'axis',
        valueFormatter: (value) => (value ? formatToCurrency(Number(value)) : '--'),
      },
      xAxis: {
        axisTick: {
          alignWithLabel: true,
        },
        boundaryGap: true,
        data: data[type].map((value) => value.label ?? ''),
        type: 'category',
      },
      yAxis: {
        type: 'value',
      },
    };
  }, [data, type, hasData]);

  const isReady = useEchartsLifecycle(svgRef, colorScheme, { height: CHART_HEIGHT, width: maxWidth }, option);

  if (!hasData) {
    return <EmptyComponent />;
  }

  if (maxWidth === 0) {
    return null;
  }

  return (
    <View style={{ height: CHART_HEIGHT, width: maxWidth }}>
      <SvgChart ref={svgRef} useRNGH={true} />
      {!isReady && <Skeleton className='absolute inset-0 h-full w-full' />}
    </View>
  );
};

export default ExpensesChart;

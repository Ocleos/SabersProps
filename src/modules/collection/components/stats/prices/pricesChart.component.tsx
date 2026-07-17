import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';
import type { EChartsOption, SeriesOption } from 'echarts';
import { BarChart, ScatterChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { use } from 'echarts/core';
import { Skeleton } from 'heroui-native/skeleton';
import { useMemo, useRef } from 'react';
import { type DimensionValue, View } from 'react-native';
import EmptyComponent from '~src/components/empty/empty.component';
import type { PricesInfosData } from '~src/modules/collection/types/pricesInfosData.type';
import { getRGBColor } from '~src/theme/colors.theme';
import { useColorScheme } from '~src/theme/useColorScheme.hooks';
import { formatToCurrency } from '~src/utils/format.utils';
import { useChartWidth } from '../useChartWidth.hooks';
import { useEchartsLifecycle } from '../useEchartsLifecycle.hooks';
import { pricesChartSeries } from './pricesChart.utils';

type PricesChartProps = {
  data: PricesInfosData[];
};

use([SVGRenderer, BarChart, GridComponent, TooltipComponent, ScatterChart]);

const ROW_HEIGHT = 50;

const PricesChart: React.FC<PricesChartProps> = ({ data }) => {
  const svgRef = useRef<HTMLElement>(null);

  const { colorScheme } = useColorScheme();

  const maxWidth = useChartWidth();
  const height = data.length * ROW_HEIGHT;
  const hasData = data.length > 0;

  const option = useMemo<EChartsOption | undefined>(() => {
    if (!hasData) {
      return undefined;
    }

    return {
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
  }, [data, hasData]);

  const rowSkeletonWidths = useMemo<DimensionValue[]>(
    () => data.map(() => `${Math.round(50 + Math.random() * 40)}%` as DimensionValue),
    [data],
  );

  const isReady = useEchartsLifecycle(svgRef, colorScheme, { height, width: maxWidth }, option);

  if (!hasData) {
    return <EmptyComponent />;
  }

  if (maxWidth === 0) {
    return null;
  }

  return (
    <View style={{ height, width: maxWidth }}>
      <SvgChart ref={svgRef} />
      {!isReady && (
        <View className='absolute inset-0 gap-4 pt-4'>
          {data.map((value, index) => (
            <View className='justify-center' key={value.id ?? index} style={{ height: ROW_HEIGHT }}>
              <Skeleton className='h-10 rounded-md' style={{ width: rowSkeletonWidths[index] }} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default PricesChart;

import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';
import type { EChartsOption } from 'echarts';
import { LineChart } from 'echarts/charts';
import { DataZoomComponent, GridComponent, TooltipComponent } from 'echarts/components';
import { type ECharts, init, use } from 'echarts/core';
import { useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import i18n from '~src/i18n.config';
import type { ExpensesData } from '~src/modules/collection/types/expense.type';
import { Colors, colors, getRGBColor } from '~src/theme/colors.theme';
import { useColorScheme } from '~src/theme/useColorScheme.hooks';
import { formatToCurrency } from '~src/utils/format.utils';
import { ExpensesTypes, getZoomByType } from './expenses.utils';

type ExpensesChartProps = {
  data: ExpensesData;
  type: ExpensesTypes;
};

use([SVGRenderer, LineChart, GridComponent, TooltipComponent, DataZoomComponent]);

const ExpensesChart: React.FC<ExpensesChartProps> = ({ type, data }) => {
  const { width } = useWindowDimensions();
  const svgRef = useRef<HTMLElement>(null);

  const { colorScheme } = useColorScheme();

  const paddingCard = 64; // ($4 (Layout) + $4 (Card)) * 2
  const maxWidth = width - paddingCard;

  useEffect(() => {
    const option: EChartsOption = {
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

    let chart: ECharts;
    if (svgRef.current) {
      chart = init(svgRef.current, colorScheme, {
        height: 300,
        renderer: 'svg',
        width: maxWidth,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [colorScheme, maxWidth, data, type]);

  return <SvgChart ref={svgRef} useRNGH={true} />;
};

export default ExpensesChart;

import SvgChart, { SVGRenderer } from '@wuba/react-native-echarts/svgChart';
import type { EChartsOption } from 'echarts';
import { LineChart } from 'echarts/charts';
import { DataZoomComponent, GridComponent, TooltipComponent } from 'echarts/components';
import { type ECharts, init, use } from 'echarts/core';
import { useColorScheme } from 'nativewind';
import { get } from 'radash';
import { useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import i18n from '~src/i18n.config';
import type { ExpensesData } from '~src/modules/stats/models/expense.model';
import { colorsTheme, fontFamily } from '~src/theme/nativewind.theme';
import { formatToCurrency } from '~src/utils/format.utils';
import { ExpensesTypes, getZoomByType } from './expenses.utils';

interface IExpensesChartProps {
  type: ExpensesTypes;
  data: ExpensesData;
}

use([SVGRenderer, LineChart, GridComponent, TooltipComponent, DataZoomComponent]);

const ExpensesChart: React.FC<IExpensesChartProps> = ({ type, data }) => {
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
        right: 0,
        left: 48,
        bottom: type !== ExpensesTypes.GLOBAL_MONTHS ? 64 : 32,
      },
      textStyle: {
        fontFamily: fontFamily.exo2,
      },
      tooltip: {
        trigger: 'axis',
        valueFormatter: (value) => (value ? formatToCurrency(Number(value)) : '--'),
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        axisTick: {
          alignWithLabel: true,
        },
        data: data[type].map((value) => value.label ?? ''),
      },
      yAxis: {
        type: 'value',
      },
      dataZoom:
        type !== ExpensesTypes.GLOBAL_MONTHS
          ? [
              {
                type: 'inside',
                start: getZoomByType(type),
                end: 100,
              },
              {
                start: getZoomByType(type),
                end: 100,
              },
            ]
          : undefined,
      series: [
        {
          name: i18n.t('stats:LABEL.PRICE'),
          type: 'line',
          symbol: 'circle',
          symbolSize: 6,
          sampling: 'lttb',
          itemStyle: {
            color: get(colorsTheme, 'primary.500'),
          },
          data: data[type].map((value) => value.price),
        },
        {
          name: i18n.t('stats:LABEL.FEES'),
          type: 'line',
          symbol: 'diamond',
          symbolSize: 6,
          sampling: 'lttb',
          itemStyle: {
            color: get(colorsTheme, 'blue.500'),
          },
          data: data[type].map((value) => value.fees),
        },
      ],
    };

    let chart: ECharts;
    if (svgRef.current) {
      chart = init(svgRef.current, colorScheme, {
        renderer: 'svg',
        width: maxWidth,
        height: 300,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [colorScheme, maxWidth, data, type]);

  return <SvgChart ref={svgRef} useRNGH />;
};

export default ExpensesChart;

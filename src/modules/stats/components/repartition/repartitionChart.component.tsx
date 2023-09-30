import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import { EChartsOption, SeriesOption } from 'echarts';
import { BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { get, map } from 'lodash';
import React, { useContext, useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import { propStates } from '~src/models/propState.model';
import { PropType, propTypes } from '~src/models/propType.model';
import { gluestackUIConfig } from '~src/theme/gluestack-ui.config';
import { ThemeContext } from '~src/theme/themeContext.theme';
import { Repartition } from '../../models/repartition.model';

echarts.use([SVGRenderer, BarChart, GridComponent]);

type RepartitionChartProps = {
  data: Repartition[];
};

const RepartitionChart: React.FC<RepartitionChartProps> = ({ data }) => {
  const svgRef = useRef<HTMLElement>(null);

  const config = gluestackUIConfig;

  const { theme } = useContext(ThemeContext);

  const paddingCard = 16 * 4; // $4 (Layout) + $4 (Card)
  const maxWidth = Dimensions.get('window').width - paddingCard;

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
        fontFamily: 'Exo_400Regular',
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
      series: map(data, (stateData): SeriesOption => {
        return {
          type: 'bar',
          stack: 'total',
          itemStyle: {
            borderWidth: 1,
            color: get(config.tokens.colors, `${propStates[stateData.state].colorScheme}200`),
            borderColor: get(config.tokens.colors, `${propStates[stateData.state].colorScheme}700`),
          },
          name: propStates[stateData.state].label,
          data: stateData.values,
        };
      }),
    };

    let chart: echarts.ECharts;
    if (svgRef.current) {
      chart = echarts.init(svgRef.current, theme, {
        renderer: 'svg',
        width: maxWidth,
        height: 300,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [theme, maxWidth, config, data]);

  return <SvgChart ref={svgRef} />;
};

export default RepartitionChart;

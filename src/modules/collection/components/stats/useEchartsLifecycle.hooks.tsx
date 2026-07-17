import type { EChartsOption } from 'echarts';
import { type ECharts, init } from 'echarts/core';
import { type RefObject, useEffect, useRef, useState } from 'react';

type ChartSize = {
  width: number;
  height: number;
};

/**
 * Splits an ECharts SVG instance's lifecycle in two: the instance itself is only (re)created
 * when the container size or theme changes (both are baked into the canvas at `init` time), while
 * `option` updates flow into the existing instance via `setOption`. Disposing/re-initializing the
 * whole SVG canvas on every data change would replay animations and reset zoom/pan state for no
 * reason. `option` is left out of the init effect on purpose - the first `setOption` call below
 * covers the initial render.
 *
 * Returns `isReady`, true once the instance has painted at least once: `@wuba/react-native-echarts`'s
 * `SvgChart` renders nothing at all until its first internal patch, so callers can use this to keep
 * a placeholder (matching the chart's reserved size) in place until there's something real to show,
 * instead of the container popping from empty to full size.
 */
export const useEchartsLifecycle = (
  svgRef: RefObject<HTMLElement | null>,
  colorScheme: string,
  size: ChartSize,
  option: EChartsOption | undefined,
) => {
  const chartRef = useRef<ECharts>(undefined);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!svgRef.current || size.width <= 0 || size.height <= 0) {
      return;
    }

    setIsReady(false);

    const chart = init(svgRef.current, colorScheme, {
      height: size.height,
      renderer: 'svg',
      width: size.width,
    });
    chart.on('rendered', () => setIsReady(true));
    chartRef.current = chart;

    return () => {
      chart.dispose();
      chartRef.current = undefined;
    };
  }, [svgRef, colorScheme, size.width, size.height]);

  useEffect(() => {
    if (option) {
      chartRef.current?.setOption(option, true);
    }
  }, [option]);

  return isReady;
};

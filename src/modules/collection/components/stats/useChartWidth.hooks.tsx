import { useWindowDimensions } from 'react-native';

// ($4 (Layout) + $4 (Card)) * 2
const CARD_PADDING = 64;

/**
 * Available width for a chart inside a stats card, clamped to `>= 0` so callers can treat a
 * degenerate (not-yet-measured or too-narrow) container as "no size" rather than a negative value.
 */
export const useChartWidth = () => {
  const { width } = useWindowDimensions();

  return Math.max(0, width - CARD_PADDING);
};

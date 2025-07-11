import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { cn } from '~ui/lib/utils';

const duration = 1000;

function Skeleton({ className, ...props }: Omit<React.ComponentPropsWithoutRef<typeof Animated.View>, 'style'>) {
  const sv = useSharedValue(1);

  useEffect(() => {
    sv.value = withRepeat(withSequence(withTiming(0.5, { duration }), withTiming(1, { duration })), -1);
  }, [sv]);

  const style = useAnimatedStyle(() => ({
    opacity: sv.value,
  }));

  return <Animated.View className={cn('rounded-md bg-secondary dark:bg-muted', className)} style={style} {...props} />;
}

export { Skeleton };

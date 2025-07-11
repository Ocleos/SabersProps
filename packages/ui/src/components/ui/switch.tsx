import * as SwitchPrimitives from '@rn-primitives/switch';
import type * as React from 'react';
import { Platform } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import { cn } from '~ui/lib/utils';
import { colorsTheme, useColorScheme } from '~ui/theme';

function SwitchWeb({
  className,
  ...props
}: SwitchPrimitives.RootProps & {
  ref?: React.RefObject<SwitchPrimitives.RootRef>;
}) {
  return (
    <SwitchPrimitives.Root
      className={cn(
        'peer h-6 w-11 shrink-0 cursor-pointer flex-row items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed',
        props.checked ? 'bg-primary' : 'bg-input',
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}>
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-foreground/5 shadow-md ring-0 transition-transform',
          props.checked ? 'translate-x-5' : 'translate-x-0',
        )}
      />
    </SwitchPrimitives.Root>
  );
}

function SwitchNative({
  className,
  ...props
}: SwitchPrimitives.RootProps & {
  ref?: React.RefObject<SwitchPrimitives.RootRef>;
}) {
  const { colorScheme } = useColorScheme();
  const translateX = useDerivedValue(() => (props.checked ? 18 : 0));
  const animatedRootStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        translateX.value,
        [0, 18],
        [colorsTheme.input[colorScheme], colorsTheme.primary[500]],
      ),
    };
  });
  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(translateX.value, { duration: 200 }) }],
  }));
  return (
    <Animated.View
      className={cn('h-8 w-[46px] rounded-full', props.disabled && 'opacity-50')}
      style={animatedRootStyle}>
      <SwitchPrimitives.Root
        className={cn(
          'h-8 w-[46px] shrink-0 flex-row items-center rounded-full border-2 border-transparent',
          props.checked ? 'bg-primary' : 'bg-input',
          className,
        )}
        {...props}>
        <Animated.View style={animatedThumbStyle}>
          <SwitchPrimitives.Thumb
            className={'h-7 w-7 rounded-full bg-background shadow-foreground/25 shadow-md ring-0'}
          />
        </Animated.View>
      </SwitchPrimitives.Root>
    </Animated.View>
  );
}

const Switch = Platform.select({
  default: SwitchNative,
  web: SwitchWeb,
});

export { Switch };

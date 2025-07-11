import { CalendarDaysIcon } from 'lucide-react-native';
import type React from 'react';
import { forwardRef } from 'react';
import type { TextInput, TextInputProps } from 'react-native';
import { View } from 'react-native';
import { cn, DEFAULT_ICON_SIZE } from '~ui/lib';
import { colorsTheme } from '~ui/theme/colorsTheme.theme';
import { Input } from './input';

const CalendarInput = forwardRef<React.ElementRef<typeof TextInput>, TextInputProps>(({ className, ...props }, ref) => {
  return (
    <View className='relative w-full'>
      <Input className={cn('pr-12', className)} readOnly ref={ref} {...props} />
      <View className='absolute right-0 m-1 h-10 w-10 items-center justify-center'>
        <CalendarDaysIcon color={colorsTheme.primary[500]} size={DEFAULT_ICON_SIZE} />
      </View>
    </View>
  );
});

CalendarInput.displayName = 'CalendarInput';

export { CalendarInput };

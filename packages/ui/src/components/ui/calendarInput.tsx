import { CalendarDaysIcon } from 'lucide-react-native';
import type React from 'react';
import type { TextInputProps } from 'react-native';
import { View } from 'react-native';
import { cn } from '~ui/lib';
import { Icon } from './icon';
import { Input } from './input';

const CalendarInput: React.FC<TextInputProps> = ({ className, ...props }) => {
  return (
    <View className='relative w-full'>
      <Input className={cn('pr-12', className)} readOnly {...props} />
      <View className='absolute right-0 h-10 w-10 items-center justify-center'>
        <Icon as={CalendarDaysIcon} className='text-primary' />
      </View>
    </View>
  );
};

CalendarInput.displayName = 'CalendarInput';

export { CalendarInput };

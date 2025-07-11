import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import type React from 'react';
import { forwardRef, useState } from 'react';
import type { TextInput, TextInputProps } from 'react-native';
import { View } from 'react-native';
import { cn, DEFAULT_ICON_SIZE } from '~ui/lib';
import { colorsTheme } from '~ui/theme/colorsTheme.theme';
import { Button } from './button';
import { Input } from './input';

const PasswordInput = forwardRef<React.ElementRef<typeof TextInput>, TextInputProps>(({ className, ...props }, ref) => {
  const [isSecure, setIsSecure] = useState(true);

  const onPress = () => setIsSecure(!isSecure);

  return (
    <View className='relative w-full'>
      <Input className={cn('pr-12', className)} ref={ref} secureTextEntry={isSecure} {...props} />
      <Button className='absolute right-0 m-1' onPress={onPress} size={'icon'} variant={'ghost'}>
        {isSecure ? (
          <EyeIcon color={colorsTheme.primary[500]} size={DEFAULT_ICON_SIZE} />
        ) : (
          <EyeOffIcon color={colorsTheme.primary[500]} size={DEFAULT_ICON_SIZE} />
        )}
      </Button>
    </View>
  );
});

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };

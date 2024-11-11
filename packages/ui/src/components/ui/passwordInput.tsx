import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import type React from 'react';
import { forwardRef, useState } from 'react';
import type { TextInput, TextInputProps } from 'react-native';
import { View } from 'react-native';
import { DEFAULT_ICON_SIZE, cn } from '~ui/lib';
import { colorsTheme } from '~ui/theme/colorsTheme.theme';
import { Button } from './button';
import { Input } from './input';

const PasswordInput = forwardRef<React.ElementRef<typeof TextInput>, TextInputProps>(({ className, ...props }, ref) => {
  const [isSecure, setIsSecure] = useState(true);

  const onPress = () => setIsSecure(!isSecure);

  return (
    <View className='relative w-full'>
      <Input ref={ref} secureTextEntry={isSecure} className={cn('pr-12', className)} {...props} />
      <Button variant={'ghost'} onPress={onPress} size={'icon'} className='absolute right-0 m-1'>
        {isSecure ? (
          <EyeIcon size={DEFAULT_ICON_SIZE} color={colorsTheme.primary[500]} />
        ) : (
          <EyeOffIcon size={DEFAULT_ICON_SIZE} color={colorsTheme.primary[500]} />
        )}
      </Button>
    </View>
  );
});

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };

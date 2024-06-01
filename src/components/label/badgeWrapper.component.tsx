import { get } from 'lodash';
import type { LucideIcon } from 'lucide-react-native';
import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';
import { cn } from '~rnr/lib/utils';
import { Badge } from '~rnr/ui/badge';
import { HStack } from '~rnr/ui/stack';
import { Text } from '~rnr/ui/text';
import { colorsTheme } from '~src/theme/nativewind.theme';

interface IBadgeWrapperProps {
  colorScheme?: string;
  icon?: LucideIcon | FC<SvgProps>;
  label: string;
}

const BadgeWrapper: React.FC<IBadgeWrapperProps> = (props) => {
  const { colorScheme, label } = props;

  return (
    <Badge className={colorScheme ? `bg-${colorScheme}-200` : ''}>
      <HStack className='items-center gap-2'>
        {props.icon && (
          <props.icon
            color={colorScheme ? get(colorsTheme, `${colorScheme}.600`) : colorsTheme.textForeground}
            width={16}
            height={16}
          />
        )}
        <Text className={cn('font-exo2', colorScheme ? `text-${colorScheme}-600` : '')}>{label}</Text>
      </HStack>
    </Badge>
  );
};

export default BadgeWrapper;

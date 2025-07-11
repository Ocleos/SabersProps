import { Badge, cn, colorsTheme, HStack, Text } from '@sabersprops/ui';
import type { LucideIcon } from 'lucide-react-native';
import { get } from 'radash';
import type { SvgProps } from 'react-native-svg';

interface IBadgeWrapperProps {
  colorScheme?: string;
  icon?: LucideIcon | React.FC<SvgProps>;
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
            height={16}
            width={16}
          />
        )}
        <Text className={cn('font-exo2', colorScheme ? `text-${colorScheme}-600` : '')}>{label}</Text>
      </HStack>
    </Badge>
  );
};

export default BadgeWrapper;

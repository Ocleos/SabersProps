import { Badge, cn, HStack, Text, THEME, useColorScheme } from '@sabersprops/ui';
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

  const { colorScheme: colorSchemeMode } = useColorScheme();

  return (
    <Badge className={colorScheme ? `bg-${colorScheme}-200` : ''}>
      <HStack className='items-center gap-2'>
        {props.icon && (
          <props.icon
            color={colorScheme ? get(THEME.colors, `${colorScheme}.600`) : THEME[colorSchemeMode].foreground}
            height={16}
            width={16}
          />
        )}
        <Text className={cn(colorScheme ? `text-${colorScheme}-600` : '')}>{label}</Text>
      </HStack>
    </Badge>
  );
};

export default BadgeWrapper;

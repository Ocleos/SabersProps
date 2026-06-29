import { Chip } from 'heroui-native/chip';
import { useThemeColor } from 'heroui-native/hooks';
import type { LucideIcon } from 'lucide-react-native';
import type { SvgProps } from 'react-native-svg';
import { type ColorScheme, getRGBColor } from '~src/theme/colors.theme';

type BadgeWrapperProps = {
  colorScheme?: ColorScheme;
  icon?: LucideIcon | React.FC<SvgProps>;
  label: string;
};

const BadgeWrapper: React.FC<BadgeWrapperProps> = (props) => {
  const [foregroundColor] = useThemeColor(['foreground']);

  const { colorScheme, label } = props;

  return (
    <Chip className={colorScheme ? colorScheme.bg : ''}>
      {props.icon && (
        <props.icon color={colorScheme ? getRGBColor(colorScheme.text) : foregroundColor} height={16} width={16} />
      )}
      <Chip.Label className={colorScheme ? colorScheme.text : ''}>{label}</Chip.Label>
    </Chip>
  );
};

export default BadgeWrapper;

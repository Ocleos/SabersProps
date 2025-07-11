import { BanIcon, CheckIcon } from 'lucide-react-native';
import BadgeWrapper from '~src/components/label/badgeWrapper.component';

interface IFilterBadgeProps {
  isSelected: boolean;
  colorSelected?: string;
  label: string;
}

export const FilterBadge: React.FC<IFilterBadgeProps> = ({ isSelected, colorSelected, label }) => {
  const colorScheme = isSelected ? colorSelected : 'neutral';

  return <BadgeWrapper colorScheme={colorScheme} icon={isSelected ? CheckIcon : BanIcon} label={label} />;
};

export default FilterBadge;

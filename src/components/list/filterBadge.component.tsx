import { Ban, Check } from 'lucide-react-native';
import BadgeWrapper from '../label/badgeWrapper.component';

interface IFilterBadgeProps {
  isSelected: boolean;
  colorSelected: string;
  label: string;
}

export const FilterBadge: React.FC<IFilterBadgeProps> = ({ isSelected, colorSelected, label }) => {
  const colorScheme = isSelected ? colorSelected : 'secondary';

  return <BadgeWrapper colorScheme={colorScheme} label={label} icon={isSelected ? Check : Ban} />;
};

export default FilterBadge;

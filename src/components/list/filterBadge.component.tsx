import { Ban, Check } from 'lucide-react-native';
import { Badge, IBadgeProps, Icon } from 'native-base';

interface IFilterBadgeProps extends IBadgeProps {
  isSelected: boolean;
  colorSelected: string;
  label: string;
}

export const FilterBadge: React.FC<IFilterBadgeProps> = ({ isSelected, colorSelected, label }) => {
  return (
    <Badge
      colorScheme={isSelected ? colorSelected : 'muted'}
      variant='subtle'
      rounded='full'
      startIcon={<Icon as={isSelected ? Check : Ban} />}
    >
      {label}
    </Badge>
  );
};

export default FilterBadge;

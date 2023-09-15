import { HStack, Icon, Text } from '@gluestack-ui/themed';
import { LucideIcon } from 'lucide-react-native';

interface ILabelIcon {
  label: string;
  icon: LucideIcon;
}

const LabelIcon: React.FC<ILabelIcon> = ({ label, icon }) => {
  return (
    <HStack gap={'$2'}>
      <Icon as={icon} size={'xl'} color={'$primary500'} />
      <Text flex={1}>{label}</Text>
    </HStack>
  );
};

export default LabelIcon;

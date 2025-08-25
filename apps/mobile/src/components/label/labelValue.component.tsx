import { HStack, Text } from '@sabersprops/ui';

interface ILabelValueProps {
  title: string;
  value: string;
}

const LabelValue: React.FC<ILabelValueProps> = ({ title, value }) => {
  return (
    <HStack className='items-baseline'>
      <Text variant='h4'>{`${title} : `}</Text>
      <Text>{value}</Text>
    </HStack>
  );
};

export default LabelValue;

import { HStack } from '~rnr/ui/stack';
import { Text } from '~rnr/ui/text';
import { H4 } from '~rnr/ui/typography';

interface ILabelValueProps {
  title: string;
  value: string;
}

const LabelValue: React.FC<ILabelValueProps> = ({ title, value }) => {
  return (
    <HStack className='items-center'>
      <H4>{`${title} : `}</H4>
      <Text>{value}</Text>
    </HStack>
  );
};

export default LabelValue;

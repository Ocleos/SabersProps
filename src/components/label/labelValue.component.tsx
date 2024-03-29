import { HStack } from '~ui/stack';
import { Text } from '~ui/text';
import { H4 } from '~ui/typography';

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

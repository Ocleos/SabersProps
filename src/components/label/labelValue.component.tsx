import { HStack, Heading, Text } from '@gluestack-ui/themed';

type Props = {
  title: string;
  value: string;
};

const LabelValue: React.FC<Props> = ({ title, value }) => {
  return (
    <HStack alignItems='center'>
      <Heading size='sm'>{`${title} : `}</Heading>
      <Text>{value}</Text>
    </HStack>
  );
};

export default LabelValue;

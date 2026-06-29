import { Typography } from 'heroui-native/text';
import { HStack } from '../ui/stack.component';

type LabelValueProps = {
  title: string;
  value: string;
};

const LabelValue: React.FC<LabelValueProps> = ({ title, value }) => {
  return (
    <HStack className='items-baseline'>
      <Typography type='h5'>{`${title} : `}</Typography>
      <Typography>{value}</Typography>
    </HStack>
  );
};

export default LabelValue;

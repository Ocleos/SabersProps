//import { Image } from 'expo-image';
import NoDataIcon from '@src/assets/noData.icon';
import { Center, Text, VStack } from 'native-base';

interface IEmptyComponentProps {
  title: string;
  icon?: React.FC;
}

const EmptyComponent: React.FC<IEmptyComponentProps> = (props) => {
  const { title } = props;

  return (
    <VStack space={10}>
      <Center mt={10}>
        <NoDataIcon size={64} />
      </Center>

      <Text textAlign="center" fontWeight="bold">
        {title}
      </Text>
    </VStack>
  );
};

export default EmptyComponent;

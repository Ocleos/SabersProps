import NoDataIcon from '@src/assets/noData.icon';
import { Center, Text, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';

interface IEmptyComponentProps {
  title?: string;
  icon?: React.FC;
}

const EmptyComponent: React.FC<IEmptyComponentProps> = (props) => {
  const { t } = useTranslation('common');
  const { title } = props;

  return (
    <VStack space={10}>
      <Center mt={10}>
        <NoDataIcon size={64} />
      </Center>

      <Text textAlign='center' fontWeight='bold'>
        {title ?? t('common:COMMON.NO_DATA')}
      </Text>
    </VStack>
  );
};

export default EmptyComponent;

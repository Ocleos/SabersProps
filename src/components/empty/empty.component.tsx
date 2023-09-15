import { Center, Text, VStack } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import NoDataIcon from '~src/assets/noData.icon';

interface IEmptyComponentProps {
  title?: string;
  icon?: React.FC;
}

const EmptyComponent: React.FC<IEmptyComponentProps> = (props) => {
  const { t } = useTranslation('common');
  const { title } = props;

  return (
    <VStack gap={'$10'}>
      <Center mt={'$10'}>
        <NoDataIcon />
      </Center>

      <Text textAlign='center' bold={true}>
        {title ?? t('common:COMMON.NO_DATA')}
      </Text>
    </VStack>
  );
};

export default EmptyComponent;

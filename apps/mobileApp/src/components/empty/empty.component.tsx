import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { VStack } from '~rnr/ui/stack';
import { Large } from '~rnr/ui/typography';
import NoDataIcon from '~src/assets/noData.icon';

interface IEmptyComponentProps {
  title?: string;
}

const EmptyComponent: React.FC<IEmptyComponentProps> = ({ title }) => {
  const { t } = useTranslation('common');

  return (
    <VStack className='gap-10'>
      <View className='mt-10 items-center'>
        <NoDataIcon />
      </View>
      <Large className='text-center'>{title ?? t('common:COMMON.NO_DATA')}</Large>
    </VStack>
  );
};

export default EmptyComponent;

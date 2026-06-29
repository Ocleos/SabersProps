import { Typography } from 'heroui-native/text';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import NoDataIcon from '~src/assets/noData.icon';
import { VStack } from '../ui/stack.component';

type EmptyComponentProps = {
  title?: string;
};

const EmptyComponent: React.FC<EmptyComponentProps> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <VStack className='gap-10'>
      <View className='mt-10 items-center'>
        <NoDataIcon />
      </View>
      <Typography className='text-center' type='h4'>
        {title ?? t('common:COMMON.NO_DATA')}
      </Typography>
    </VStack>
  );
};

export default EmptyComponent;

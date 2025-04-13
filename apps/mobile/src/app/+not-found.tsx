import { View } from 'react-native';
import PageNotFoundComponent from '~src/components/error/pageNotFound.component';

export default () => (
  <View className='flex-1 bg-background'>
    <PageNotFoundComponent />
  </View>
);

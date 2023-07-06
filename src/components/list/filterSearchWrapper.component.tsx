import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { HStack, Icon, IconButton, Input } from 'native-base';
import { useTranslation } from 'react-i18next';

interface IFilterSearchWrapper {
  searchValue: string;
  onSearchValue: (value: string) => void;
  onOpenFilter?: (open: boolean) => void;
}

const FilterSearchWrapper: React.FC<IFilterSearchWrapper> = (props) => {
  const { t } = useTranslation('common');

  const { onOpenFilter, onSearchValue, searchValue } = props;

  const onChangeText = (text: string) => {
    onSearchValue(text.toLocaleLowerCase());
  };

  return (
    <HStack pb={4}>
      <Input
        flex={1}
        variant='rounded'
        value={searchValue}
        placeholder={t('common:COMMON.SEARCH')}
        autoCapitalize='none'
        onChangeText={onChangeText}
        InputLeftElement={<Icon as={FontAwesome5} name='search' px={4} />}
        InputRightElement={
          <IconButton icon={<Icon as={Ionicons} name='close' />} rounded={'full'} onPress={() => onChangeText('')} />
        }
      />
      {onOpenFilter && (
        <IconButton
          icon={<Icon as={MaterialCommunityIcons} name='filter-outline' />}
          rounded={'full'}
          onPress={() => onOpenFilter(true)}
        />
      )}
    </HStack>
  );
};

export default FilterSearchWrapper;

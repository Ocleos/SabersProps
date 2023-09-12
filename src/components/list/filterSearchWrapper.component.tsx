import { Filter, Search, X } from 'lucide-react-native';
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
        InputLeftElement={<Icon as={Search} ml={2} size={6} />}
        InputRightElement={
          <IconButton icon={<Icon as={X} size={6} />} rounded={'full'} onPress={() => onChangeText('')} />
        }
      />
      {onOpenFilter && (
        <IconButton icon={<Icon as={Filter} size={6} />} rounded={'full'} onPress={() => onOpenFilter(true)} />
      )}
    </HStack>
  );
};

export default FilterSearchWrapper;

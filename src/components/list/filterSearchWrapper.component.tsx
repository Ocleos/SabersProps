import { Button, ButtonIcon, HStack, Input, InputField, InputIcon, InputSlot } from '@gluestack-ui/themed';
import { Filter, Search, X } from 'lucide-react-native';
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
    <HStack gap={'$4'}>
      <Input flex={1} variant='rounded'>
        <InputIcon as={Search} size='xl' m={'$2'} />
        <InputField placeholder={t('common:COMMON.SEARCH')} value={searchValue} onChangeText={onChangeText} />
        <InputSlot onPress={() => onChangeText('')}>
          <InputIcon as={X} size='xl' mr={'$2'} />
        </InputSlot>
      </Input>

      {onOpenFilter && (
        <Button variant='link' borderRadius={'$full'} onPress={() => onOpenFilter(true)}>
          <ButtonIcon as={Filter} size='xl' />
        </Button>
      )}
    </HStack>
  );
};

export default FilterSearchWrapper;

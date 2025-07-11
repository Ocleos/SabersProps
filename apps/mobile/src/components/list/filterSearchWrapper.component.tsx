import { Button, colorsTheme, DEFAULT_ICON_SIZE, HStack, Input } from '@sabersprops/ui';
import { FilterIcon } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IFilterSearchWrapper {
  searchValue: string;
  onSearchValue: (value: string) => void;
  onOpenFilter?: () => void;
}

const FilterSearchWrapper: React.FC<IFilterSearchWrapper> = (props) => {
  const { t } = useTranslation('common');

  const { onOpenFilter, onSearchValue, searchValue } = props;

  const [textValue, setTextValue] = useState(searchValue);

  const onChangeText = (text: string) => {
    setTextValue(text);
    onSearchValue(text.toLocaleLowerCase());
  };

  return (
    <HStack className='items-center gap-4'>
      <Input
        className='flex-1 grow rounded-full px-6'
        onChangeText={onChangeText}
        placeholder={t('common:COMMON.SEARCH')}
        value={textValue}
      />

      {onOpenFilter && (
        <Button className='flex-none' onPress={() => onOpenFilter()} size='icon' variant='ghost'>
          <FilterIcon color={colorsTheme.primary[500]} size={DEFAULT_ICON_SIZE} />
        </Button>
      )}
    </HStack>
  );
};

export default FilterSearchWrapper;

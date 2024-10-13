import { FilterIcon } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '~rnr/ui/button';
import { Input } from '~rnr/ui/input';
import { HStack } from '~rnr/ui/stack';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { DEFAULT_ICON_SIZE } from '~src/utils/icons.utils';

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
        value={textValue}
        onChangeText={onChangeText}
        placeholder={t('common:COMMON.SEARCH')}
      />

      {onOpenFilter && (
        <Button size='icon' variant='ghost' className='flex-none' onPress={() => onOpenFilter()}>
          <FilterIcon size={DEFAULT_ICON_SIZE} color={colorsTheme.primary[500]} />
        </Button>
      )}
    </HStack>
  );
};

export default FilterSearchWrapper;

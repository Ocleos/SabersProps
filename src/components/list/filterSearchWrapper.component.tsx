import { Filter } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { Button } from '~ui/button';
import { Input } from '~ui/input';
import { HStack } from '~ui/stack';

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
        className='flex-1 grow rounded-full'
        value={textValue}
        onChangeText={onChangeText}
        placeholder={t('common:COMMON.SEARCH')}
      />

      {onOpenFilter && (
        <Button size='icon' variant='ghost' className='flex-none' onPress={() => onOpenFilter()}>
          <Filter color={colorsTheme.primary[500]} />
        </Button>
      )}
    </HStack>
  );
};

export default FilterSearchWrapper;

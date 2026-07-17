import { Button } from 'heroui-native/button';
import { Input } from 'heroui-native/input';
import { InputGroup } from 'heroui-native/input-group';
import { CircleXIcon, FilterIcon } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '~src/hooks/useDebounce.hooks';
import { Icon } from '../ui/icon.component';
import { HStack } from '../ui/stack.component';

type FilterSearchWrapperProps = {
  onOpenFilter?: () => void;
  onSearchValue: (value: string) => void;
  searchValue: string;
};

const FilterSearchWrapper: React.FC<FilterSearchWrapperProps> = (props) => {
  const { t } = useTranslation();

  const { onOpenFilter, onSearchValue, searchValue } = props;

  const [textValue, setTextValue] = useState(searchValue);
  const debouncedTextValue = useDebounce(textValue);

  // Skip the effect's first run: debouncedTextValue starts out equal to the initial searchValue,
  // so without this guard mounting would immediately re-call onSearchValue with a value the parent
  // already has, triggering a redundant state update/re-render there.
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onSearchValue(debouncedTextValue.toLocaleLowerCase());
  }, [debouncedTextValue, onSearchValue]);

  const onClear = () => {
    setTextValue('');
    onSearchValue('');
  };

  return (
    <HStack className='items-center gap-4'>
      <InputGroup className='flex-1'>
        <Input onChangeText={setTextValue} placeholder={t('common:COMMON.SEARCH')} value={textValue} />
        <InputGroup.Suffix>
          <Button isIconOnly={true} onPress={onClear} variant='ghost'>
            <Icon as={CircleXIcon} className='text-muted' />
          </Button>
        </InputGroup.Suffix>
      </InputGroup>

      {onOpenFilter && (
        <Button className='flex-none' isIconOnly={true} onPress={() => onOpenFilter()} variant='ghost'>
          <Icon as={FilterIcon} className='text-accent' />
        </Button>
      )}
    </HStack>
  );
};

export default FilterSearchWrapper;

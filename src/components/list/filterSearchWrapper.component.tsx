import { Button } from 'heroui-native/button';
import { Input } from 'heroui-native/input';
import { InputGroup } from 'heroui-native/input-group';
import { CircleXIcon, FilterIcon } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

  const onChangeText = (text: string) => {
    setTextValue(text);
    onSearchValue(text.toLocaleLowerCase());
  };

  return (
    <HStack className='items-center gap-4'>
      <InputGroup className='flex-1'>
        <Input onChangeText={onChangeText} placeholder={t('common:COMMON.SEARCH')} value={textValue} />
        <InputGroup.Suffix>
          <Button isIconOnly={true} onPress={() => onChangeText('')} variant='ghost'>
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

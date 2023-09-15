import {
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectPortal,
  SelectTrigger,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { ChevronDown } from 'lucide-react-native';
import React, { useContext } from 'react';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { ThemeContext } from '~src/theme/themeContext.theme';

type ISelectWrapperProps = {
  placeholder?: string;
  initialSelectedLabel?: string;
  children: React.ReactNode;
};

const SelectWrapper = <T extends FieldValues>(props: ISelectWrapperProps & UseControllerProps<T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ control: props.control, name: props.name });

  const { placeholder, initialSelectedLabel, children } = props;

  const { isDarkTheme } = useContext(ThemeContext);

  const borderColor = isDarkTheme ? '$textDark400' : '$textLight500';

  return (
    <VStack gap={'$0'} mt={'$2'}>
      <Select
        selectedValue={field.value ? field.value.toString() : undefined}
        selectedLabel={initialSelectedLabel}
        onValueChange={field.onChange}
        isInvalid={invalid}
      >
        <SelectTrigger
          variant='outline'
          size='xl'
          bgColor={isDarkTheme ? '$backgroundDark900' : '$backgroundLight100'}
          borderColor={invalid ? '$error500' : borderColor}
          borderRadius={'$lg'}
        >
          <SelectInput
            pl={'$4'}
            placeholder={placeholder}
            color={isDarkTheme ? '$textDark400' : '$textLight500'}
            fontSize={'$md'}
            fontWeight={'$extrabold'}
            fontFamily='Exo2_800ExtraBold'
          />
          <SelectIcon mr={'$4'}>
            <Icon as={ChevronDown} size='xl' />
          </SelectIcon>
        </SelectTrigger>

        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {children}
          </SelectContent>
        </SelectPortal>
      </Select>

      {error && (
        <Text fontSize={'$xs'} color={'$error500'}>
          {error.message}
        </Text>
      )}
    </VStack>
  );
};

export default SelectWrapper;

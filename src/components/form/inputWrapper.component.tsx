import { useToken } from '@gluestack-style/react';
import { isNil } from 'lodash';
import { useContext } from 'react';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { ThemeContext } from '~src/theme/themeContext.theme';
import { InputOutline, InputOutlineProps } from './inputOutline.component';

const InputWrapper = <T extends FieldValues>(props: InputOutlineProps & UseControllerProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control: props.control, name: props.name });

  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <InputOutline
      // Default
      value={!isNil(field.value) ? `${field.value}` : ''}
      onBlur={field.onBlur}
      onChangeText={(entryValue) => {
        let newValue = entryValue;
        if (props.keyboardType === 'decimal-pad' || props.keyboardType === 'numeric') {
          newValue = entryValue.replace(',', '.');
        }

        field.onChange(newValue);
      }}
      error={error?.message}
      // Customization
      activeColor={useToken('colors', 'primary500')}
      inactiveColor={useToken('colors', isDarkTheme ? 'textDark400' : 'textLight500')}
      errorColor={useToken('colors', 'error500')}
      backgroundColor={useToken('colors', isDarkTheme ? 'backgroundDark900' : 'backgroundLight100')}
      fontSize={14}
      fontWeight='800'
      fontFamily='Exo2_800ExtraBold'
      fontColor={useToken('colors', isDarkTheme ? 'textDark200' : 'textLight700')}
      errorFontSize={12}
      errorFontFamily='Exo2_400Regular'
      assistiveTextFontSize={12}
      assistiveFontFamily='Exo2_400Regular'
      assistiveTextColor={useToken('colors', isDarkTheme ? 'textDark400' : 'textLight500')}
      characterCountFontSize={10}
      characterCountFontFamily='Exo2_400Regular'
      characterCountColor={useToken('colors', isDarkTheme ? 'textDark400' : 'textLight500')}
      paddingHorizontal={16}
      paddingVertical={16}
      roundness={8}
      // Props
      {...props}
    />
  );
};

export default InputWrapper;

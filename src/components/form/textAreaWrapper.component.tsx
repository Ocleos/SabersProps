import { isNil } from 'lodash';
import { ITextAreaProps, TextArea } from 'native-base';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';

const TextAreaWrapper = <T extends FieldValues>(props: ITextAreaProps & UseControllerProps<T>) => {
  const {
    field,
    fieldState: { invalid },
  } = useController({ control: props.control, name: props.name });

  return (
    <TextArea
      autoCompleteType={'off'}
      totalLines={5}
      value={!isNil(field.value) ? `${field.value}` : ''}
      onBlur={field.onBlur}
      onChangeText={field.onChange}
      isInvalid={invalid}
      {...props}
    />
  );
};

export default TextAreaWrapper;

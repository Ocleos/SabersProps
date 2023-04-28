import { ISelectProps, Select } from 'native-base';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';

const SelectWrapper = <T extends FieldValues>(props: ISelectProps & UseControllerProps<T>) => {
  const { field } = useController({ control: props.control, name: props.name });

  return (
    <Select selectedValue={field.value ? field.value.toString() : undefined} onValueChange={field.onChange} {...props}>
      {props.children}
    </Select>
  );
};

export default SelectWrapper;

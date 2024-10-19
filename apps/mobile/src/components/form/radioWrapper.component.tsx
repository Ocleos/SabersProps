import { HStack, Label, RadioGroupItem } from '@sabersprops/ui';

interface IRadioWrapperProps {
  value: string;
  label: string;
  onLabelPress?: (value: string) => void;
}

const RadioWrapper: React.FC<IRadioWrapperProps> = ({ value, label, onLabelPress }) => {
  return (
    <HStack className='m-1 items-center gap-2'>
      <RadioGroupItem aria-labelledby={`label-${value}`} value={value} />
      <Label
        nativeID={`label-${value}`}
        onPress={() => {
          if (onLabelPress) {
            onLabelPress(value);
          }
        }}>
        {label}
      </Label>
    </HStack>
  );
};

export default RadioWrapper;

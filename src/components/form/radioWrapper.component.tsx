import { CircleIcon, Radio, RadioIcon, RadioIndicator, RadioLabel } from '@gluestack-ui/themed';
import React from 'react';

interface IRadioWrapperProps {
  value: string;
  label: string;
}

const RadioWrapper: React.FC<IRadioWrapperProps> = ({ value, label }) => {
  return (
    <Radio value={value} m='$2'>
      <RadioIndicator mr='$2'>
        <RadioIcon as={CircleIcon} />
      </RadioIndicator>
      <RadioLabel>{label}</RadioLabel>
    </Radio>
  );
};

export default RadioWrapper;

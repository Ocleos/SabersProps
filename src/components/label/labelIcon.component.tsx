import { iconStyle } from '@src/theme/icon.theme';
import { HStack, IIconProps, Icon, Text } from 'native-base';
import React from 'react';

interface ILabelIcon {
  label: string;
  icon: IIconProps;
}

const LabelIcon: React.FC<ILabelIcon> = ({ label, icon }) => {
  return (
    <HStack space={2}>
      <Icon {...icon} {...iconStyle} />
      <Text>{label}</Text>
    </HStack>
  );
};

export default LabelIcon;

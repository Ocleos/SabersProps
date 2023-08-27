import { iconStyle } from '@src/theme/icon.theme';
import { HStack, IIconProps, Icon, Text } from 'native-base';
import { IViewProps } from 'native-base/lib/typescript/components/basic/View/types';
import React from 'react';

interface ILabelIcon {
  label: string;
  icon: IIconProps;
  viewProps?: IViewProps;
}

const LabelIcon: React.FC<ILabelIcon> = ({ label, icon, viewProps }) => {
  return (
    <HStack space={2} {...viewProps}>
      <Icon {...icon} {...iconStyle} />
      <Text flex={1}>{label}</Text>
    </HStack>
  );
};

export default LabelIcon;

import { Badge, BadgeIcon, BadgeText } from '@gluestack-ui/themed';
import { LucideIcon } from 'lucide-react-native';
import React from 'react';

type BadgeWrapperProps = {
  colorScheme: string;
  icon?: LucideIcon | unknown;
  label: string;
};

const BadgeWrapper: React.FC<BadgeWrapperProps> = ({ colorScheme, label, icon }) => {
  return (
    <Badge
      variant='solid'
      rounded={'$full'}
      sx={{
        _dark: {
          bg: `$${colorScheme}200`,
        },
        _light: {
          bg: `$${colorScheme}100`,
        },
      }}>
      {icon && <BadgeIcon as={icon} color={`$${colorScheme}900`} size='xl' />}
      <BadgeText textTransform='capitalize' color={`$${colorScheme}900`} m={'$1'}>
        {label}
      </BadgeText>
    </Badge>
  );
};

export default BadgeWrapper;

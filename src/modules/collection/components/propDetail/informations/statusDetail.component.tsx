import { SabersPropsIcon } from '@src/assets/sabersProps.icon';
import { propStates } from '@src/models/propState.model';
import { propTypes } from '@src/models/propType.model';
import { iconStyle } from '@src/theme/icon.theme';
import { Badge, Box, HStack, IBadgeProps, Icon } from 'native-base';
import React from 'react';
import { PropDetail } from '../../../models/propDetail.model';

interface IStatusDetail {
  prop: PropDetail;
}

const StatusDetail: React.FC<IStatusDetail> = ({ prop }) => {
  const badgeStyle: IBadgeProps = {
    _text: { fontSize: 'md' },
    p: 2,
    borderRadius: 'sm',
  };

  return (
    <HStack mb={2} alignItems={'center'}>
      <Box w='1/2' alignItems={'center'}>
        <Badge
          variant={'outline'}
          colorScheme={'primary'}
          {...badgeStyle}
          leftIcon={<Icon as={SabersPropsIcon} name={propTypes[prop.type].iconName} {...iconStyle} />}
        >
          {propTypes[prop.type].label}
        </Badge>
      </Box>

      <Box w='1/2' alignItems={'center'}>
        <Badge variant={'subtle'} colorScheme={propStates[prop.state].colorScheme} {...badgeStyle}>
          {propStates[prop.state].label}
        </Badge>
      </Box>
    </HStack>
  );
};

export default StatusDetail;

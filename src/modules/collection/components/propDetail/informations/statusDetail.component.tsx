import { Badge, Box, HStack, IBadgeProps, Icon } from 'native-base';
import React from 'react';
import { SabersPropsIcon } from '~src/assets/sabersProps.icon';
import { propStates } from '~src/models/propState.model';
import { propTypes } from '~src/models/propType.model';
import { PropDetail } from '../../../models/propDetail.model';

interface IStatusDetail {
  prop: PropDetail;
}

const StatusDetail: React.FC<IStatusDetail> = ({ prop }) => {
  const badgeStyle: IBadgeProps = {
    px: 4,
    variant: 'subtle',
    rounded: 'full',
  };

  return (
    <HStack mb={2} alignItems={'center'}>
      <Box w='1/2' alignItems={'center'}>
        <Badge
          colorScheme={'primary'}
          {...badgeStyle}
          startIcon={<Icon as={SabersPropsIcon} name={propTypes[prop.type].iconName} />}
        >
          {propTypes[prop.type].label}
        </Badge>
      </Box>

      <Box w='1/2' alignItems={'center'}>
        <Badge colorScheme={propStates[prop.state].colorScheme} {...badgeStyle}>
          {propStates[prop.state].label}
        </Badge>
      </Box>
    </HStack>
  );
};

export default StatusDetail;

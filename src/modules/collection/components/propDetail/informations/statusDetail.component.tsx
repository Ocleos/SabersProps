import { Box, HStack } from '@gluestack-ui/themed';
import BadgeWrapper from '~src/components/label/badgeWrapper.component';
import { propStates } from '~src/models/propState.model';
import { propTypes } from '~src/models/propType.model';
import type { PropDetail } from '../../../models/propDetail.model';

interface IStatusDetail {
  prop: PropDetail;
}

const StatusDetail: React.FC<IStatusDetail> = ({ prop }) => {
  return (
    <HStack alignItems={'center'}>
      <Box w={'$1/2'} alignItems={'center'}>
        <BadgeWrapper colorScheme={'primary'} label={propTypes[prop.type].label} icon={propTypes[prop.type].icon} />
      </Box>

      <Box w={'$1/2'} alignItems={'center'}>
        <BadgeWrapper colorScheme={propStates[prop.state].colorScheme} label={propStates[prop.state].label} />
      </Box>
    </HStack>
  );
};

export default StatusDetail;

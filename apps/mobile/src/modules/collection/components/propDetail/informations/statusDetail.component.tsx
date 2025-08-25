import { HStack } from '@sabersprops/ui';
import BadgeWrapper from '~src/components/label/badgeWrapper.component';
import { propStates } from '~src/models/propState.model';
import { propTypes } from '~src/models/propType.model';
import type { PropDetail } from '~src/modules/collection/models/propDetail.model';

interface IStatusDetail {
  prop: PropDetail;
}

const StatusDetail: React.FC<IStatusDetail> = ({ prop }) => {
  return (
    <HStack className='justify-center gap-6'>
      <BadgeWrapper colorScheme='primary' icon={propTypes[prop.type].icon} label={propTypes[prop.type].label} />
      <BadgeWrapper
        colorScheme={propStates[prop.state].colorScheme}
        icon={propStates[prop.state].icon}
        label={propStates[prop.state].label}
      />
    </HStack>
  );
};

export default StatusDetail;

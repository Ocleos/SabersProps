import { HStack } from '@sabersprops/ui';
import { View } from 'react-native';
import BadgeWrapper from '~src/components/label/badgeWrapper.component';
import { propStates } from '~src/models/propState.model';
import { propTypes } from '~src/models/propType.model';
import type { PropDetail } from '~src/modules/collection/models/propDetail.model';

interface IStatusDetail {
  prop: PropDetail;
}

const StatusDetail: React.FC<IStatusDetail> = ({ prop }) => {
  return (
    <HStack>
      <View className='basis-1/2 items-center'>
        <BadgeWrapper colorScheme='primary' icon={propTypes[prop.type].icon} label={propTypes[prop.type].label} />
      </View>

      <View className='basis-1/2 items-center'>
        <BadgeWrapper
          colorScheme={propStates[prop.state].colorScheme}
          icon={propStates[prop.state].icon}
          label={propStates[prop.state].label}
        />
      </View>
    </HStack>
  );
};

export default StatusDetail;

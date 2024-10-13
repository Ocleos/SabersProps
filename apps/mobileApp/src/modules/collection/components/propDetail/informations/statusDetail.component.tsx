import { View } from 'react-native';
import { HStack } from '~rnr/ui/stack';
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
        <BadgeWrapper label={propTypes[prop.type].label} colorScheme='primary' icon={propTypes[prop.type].icon} />
      </View>

      <View className='basis-1/2 items-center'>
        <BadgeWrapper
          colorScheme={propStates[prop.state].colorScheme}
          label={propStates[prop.state].label}
          icon={propStates[prop.state].icon}
        />
      </View>
    </HStack>
  );
};

export default StatusDetail;

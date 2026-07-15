import { Skeleton } from 'heroui-native/skeleton';
import BadgeWrapper from '~src/components/label/badgeWrapper.component';
import { HStack } from '~src/components/ui/stack.component';
import type { PropDetail } from '~src/modules/collection/types/propDetail.type';
import { propStates } from '~src/modules/collection/types/propState.type';
import { propTypes } from '~src/modules/collection/types/propType.type';
import { Colors, colors } from '~src/theme/colors.theme';

type StatusDetailProps = {
  isLoading?: boolean;
  prop?: PropDetail;
};

const StatusDetail: React.FC<StatusDetailProps> = ({ isLoading, prop }) => {
  return (
    <HStack className='justify-center gap-6'>
      {isLoading || !prop ? (
        <>
          <Skeleton className='h-8 w-24 rounded-full' />
          <Skeleton className='h-8 w-24 rounded-full' />
        </>
      ) : (
        <>
          <BadgeWrapper
            colorScheme={colors[Colors.PRIMARY]}
            icon={propTypes[prop.type].icon}
            label={propTypes[prop.type].label}
          />
          <BadgeWrapper
            colorScheme={propStates[prop.state].colorScheme}
            icon={propStates[prop.state].icon}
            label={propStates[prop.state].label}
          />
        </>
      )}
    </HStack>
  );
};

export default StatusDetail;

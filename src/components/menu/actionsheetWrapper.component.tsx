import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '@gluestack-ui/themed';
import type { ReactNode } from 'react';

type ActionsheetWrapperProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const ActionsheetWrapper: React.FC<ActionsheetWrapperProps> = ({ isOpen, onClose, children }) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent maxHeight='75%'>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        {children}
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default ActionsheetWrapper;

import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { colorsTheme, useColorScheme } from '@sabersprops/ui';
import type { RefObject } from 'react';

interface IBottomSheetWrapperProps {
  children: React.ReactNode;
  ref: RefObject<BottomSheetModal | null>;
}

const BottomSheetWrapper: React.FC<IBottomSheetWrapperProps> = ({ children, ref }) => {
  const { colorScheme } = useColorScheme();

  return (
    <BottomSheetModal
      backdropComponent={(props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />}
      backgroundStyle={{
        backgroundColor: colorsTheme.card[colorScheme],
        borderColor: colorsTheme.border[colorScheme],
        borderWidth: 1,
      }}
      enableDynamicSizing
      enablePanDownToClose
      handleIndicatorStyle={{ backgroundColor: colorsTheme.foreground[colorScheme] }}
      ref={ref}
      snapPoints={['75%']}>
      {children}
    </BottomSheetModal>
  );
};

export default BottomSheetWrapper;

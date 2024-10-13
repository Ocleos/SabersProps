import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { type ReactNode, forwardRef } from 'react';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { useColorScheme } from '~src/theme/useColorTheme.theme';

interface IBottomSheetWrapperProps {
  children: ReactNode;
}

const BottomSheetWrapper = forwardRef<BottomSheetModal, IBottomSheetWrapperProps>(({ children }, ref) => {
  const { colorScheme } = useColorScheme();

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing
      enablePanDownToClose
      snapPoints={['75%']}
      backdropComponent={(props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />}
      backgroundStyle={{
        backgroundColor: colorsTheme.card[colorScheme],
        borderColor: colorsTheme.border[colorScheme],
        borderWidth: 1,
      }}
      handleIndicatorStyle={{ backgroundColor: colorsTheme.foreground[colorScheme] }}>
      {children}
    </BottomSheetModal>
  );
});

export default BottomSheetWrapper;

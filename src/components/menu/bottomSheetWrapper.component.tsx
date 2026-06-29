import { BottomSheetBackdrop, BottomSheetModal, type BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { useThemeColor } from 'heroui-native/hooks';
import { forwardRef } from 'react';

const BottomSheetWrapper = forwardRef<BottomSheetModal, BottomSheetModalProps>(({ children, ...props }, ref) => {
  const [surfaceColor, borderColor, foregroundColor] = useThemeColor(['surface', 'border', 'foreground']);

  return (
    <BottomSheetModal
      backdropComponent={(bottomSheetBackdropProps) => (
        <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...bottomSheetBackdropProps} />
      )}
      backgroundStyle={{
        backgroundColor: surfaceColor,
        borderColor: borderColor,
        borderWidth: 1,
      }}
      enableDynamicSizing
      enablePanDownToClose
      handleIndicatorStyle={{ backgroundColor: foregroundColor }}
      ref={ref}
      snapPoints={['75%']}
      {...props}>
      {children}
    </BottomSheetModal>
  );
});

export default BottomSheetWrapper;

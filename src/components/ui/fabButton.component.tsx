import { Button } from 'heroui-native/button';
import type React from 'react';

type FabButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
};

const FabButton: React.FC<FabButtonProps> = ({ onPress, children }) => {
  return (
    <Button className='absolute right-4 bottom-4 z-20 h-16 w-16 rounded-full' isIconOnly onPress={onPress}>
      {children}
    </Button>
  );
};

export default FabButton;

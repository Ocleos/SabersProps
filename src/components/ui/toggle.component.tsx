import { Button } from 'heroui-native/button';
import { cn } from 'heroui-native/utils';
import type { LucideIcon } from 'lucide-react-native';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Icon } from './icon.component';

type ToggleProps = {
  icon: LucideIcon;
  isDisabled?: boolean;
  isPressed: boolean;
  onPressedChange?: (pressed: boolean) => void;
};

const Toggle: React.FC<ToggleProps> = (props) => {
  const { icon, isDisabled, isPressed, onPressedChange } = props;

  const [isOn, setIsOn] = useState(isPressed);

  useEffect(() => {
    setIsOn(isPressed);
  }, [isPressed]);

  return (
    <Button
      className={cn(isOn ? 'bg-accent-soft' : 'bg-default', 'rounded-lg')}
      isDisabled={isDisabled}
      isIconOnly={true}
      onPress={() => {
        if (onPressedChange) {
          onPressedChange(!isOn);
        }
        setIsOn(!isOn);
      }}>
      <Icon as={icon} className={isOn ? 'text-accent-soft-foreground' : 'text-default-soft-foreground'} />
    </Button>
  );
};

export default Toggle;

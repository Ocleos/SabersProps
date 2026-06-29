import { Button } from 'heroui-native/button';
import { cn } from 'heroui-native/utils';
import type { LucideIcon } from 'lucide-react-native';
import type React from 'react';
import { useState } from 'react';
import { Icon } from './icon.component';

type ToggleProps = {
  isPressed: boolean;
  onPressedChange?: (pressed: boolean) => void;
  icon: LucideIcon;
};

const Toggle: React.FC<ToggleProps> = (props) => {
  const { isPressed, onPressedChange, icon } = props;

  const [isOn, setIsOn] = useState(isPressed);

  return (
    <Button
      className={cn(isOn ? 'bg-accent-soft' : 'bg-default', 'rounded-lg')}
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

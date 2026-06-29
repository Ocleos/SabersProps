import { Card } from 'heroui-native/card';
import { PressableFeedback } from 'heroui-native/pressable-feedback';
import { Surface } from 'heroui-native/surface';
import { ChevronRightIcon, type LucideIcon } from 'lucide-react-native';
import { Icon } from '~src/components/ui/icon.component';
import { HStack, VStack } from '~src/components/ui/stack.component';

type DashboardNavCardProps = {
  description: string;
  icon: LucideIcon;
  onPress: () => void;
  title: string;
};

const DashboardNavCard: React.FC<DashboardNavCardProps> = (props) => {
  const { description, icon, onPress, title } = props;

  return (
    <PressableFeedback onPress={onPress}>
      <PressableFeedback.Highlight />
      <PressableFeedback.Ripple />

      <Card>
        <Card.Body>
          <HStack className='items-center gap-4'>
            <Surface className='rounded-full p-3' variant='tertiary'>
              <Icon as={icon} className='text-accent' />
            </Surface>

            <VStack className='flex-1 gap-1'>
              <Card.Title>{title}</Card.Title>
              <Card.Description>{description}</Card.Description>
            </VStack>

            <Icon as={ChevronRightIcon} className='text-accent' />
          </HStack>
        </Card.Body>
      </Card>
    </PressableFeedback>
  );
};

export default DashboardNavCard;

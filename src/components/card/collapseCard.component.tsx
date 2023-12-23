import { Box, HStack, Heading, Icon, Pressable, VStack } from '@gluestack-ui/themed';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { ComponentProps, useState } from 'react';
import Card from './card.component';

interface ICollapseCard extends ComponentProps<typeof Box> {
  title?: string;
  isOpened?: boolean;
}

const CollapseCard: React.FC<ICollapseCard> = (props) => {
  const { title, isOpened = false, children } = props;

  const [isOpen, setIsOpen] = useState<boolean>(isOpened);

  return (
    <Card {...props}>
      <VStack gap={'$2'}>
        <Pressable
          onPress={() => {
            setIsOpen(!isOpen);
          }}>
          <HStack gap={'$2'} alignItems='center'>
            <Heading flex={1} isTruncated={true} m={'auto'}>
              {title}
            </Heading>

            <Icon as={isOpen ? ChevronUp : ChevronDown} size='xl' color='$primary500' />
          </HStack>
        </Pressable>

        {isOpen ? children : null}
      </VStack>
    </Card>
  );
};

export default CollapseCard;

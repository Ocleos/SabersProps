import { Box, Button, ButtonIcon, HStack, Heading, VStack } from '@gluestack-ui/themed';
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
        <HStack gap={'$2'}>
          <Heading flex={1} isTruncated={true} m={'auto'}>
            {title}
          </Heading>

          <Button
            variant='link'
            onPress={() => {
              setIsOpen(!isOpen);
            }}
          >
            <ButtonIcon as={isOpen ? ChevronUp : ChevronDown} size='xl' />
          </Button>
        </HStack>

        {isOpen ? children : null}
      </VStack>
    </Card>
  );
};

export default CollapseCard;

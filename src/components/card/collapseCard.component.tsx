import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HStack, Heading, IBoxProps, Icon, IconButton, VStack } from 'native-base';
import { useState } from 'react';
import Card from './card.component';

interface ICollapseCard extends IBoxProps {
  title?: string;
  isOpened?: boolean;
}

const CollapseCard: React.FC<ICollapseCard> = (props) => {
  const { title, isOpened = false, children } = props;

  const [isOpen, setIsOpen] = useState<boolean>(isOpened);

  return (
    <Card {...props}>
      <VStack space={2}>
        <HStack space={2}>
          <Heading flex={1} isTruncated={true} m={'auto'}>
            {title}
          </Heading>

          <IconButton
            icon={
              isOpen ? (
                <Icon as={MaterialCommunityIcons} name='chevron-up' />
              ) : (
                <Icon as={MaterialCommunityIcons} name='chevron-down' />
              )
            }
            borderRadius={'full'}
            variant={'ghost'}
            size='lg'
            colorScheme={'primary'}
            onPress={() => {
              setIsOpen(!isOpen);
            }}
          />
        </HStack>

        {isOpen ? children : null}
      </VStack>
    </Card>
  );
};

export default CollapseCard;

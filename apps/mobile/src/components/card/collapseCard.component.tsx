import { Card, CardContent, CardHeader, CardTitle, colorsTheme, DEFAULT_ICON_SIZE, HStack } from '@sabersprops/ui';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, type View } from 'react-native';

interface ICollapseCard extends React.ComponentProps<typeof View> {
  title?: string;
  isOpened?: boolean;
}

const CollapseCard: React.FC<ICollapseCard> = (props) => {
  const { title, isOpened = false, children } = props;

  const [isOpen, setIsOpen] = useState<boolean>(isOpened);

  return (
    <Card {...props}>
      <CardHeader>
        <Pressable onPress={() => setIsOpen(!isOpen)}>
          <HStack className='items-center gap-2'>
            <CardTitle className='grow'>{title}</CardTitle>
            {isOpen ? (
              <ChevronUpIcon color={colorsTheme.primary[500]} size={DEFAULT_ICON_SIZE} />
            ) : (
              <ChevronDownIcon color={colorsTheme.primary[500]} size={DEFAULT_ICON_SIZE} />
            )}
          </HStack>
        </Pressable>
      </CardHeader>

      {isOpen && <CardContent>{children}</CardContent>}
    </Card>
  );
};

export default CollapseCard;

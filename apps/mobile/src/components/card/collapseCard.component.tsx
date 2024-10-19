import { Card, CardContent, CardHeader, CardTitle, DEFAULT_ICON_SIZE, HStack, colorsTheme } from '@sabersprops/ui';
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
              <ChevronUpIcon size={DEFAULT_ICON_SIZE} color={colorsTheme.primary[500]} />
            ) : (
              <ChevronDownIcon size={DEFAULT_ICON_SIZE} color={colorsTheme.primary[500]} />
            )}
          </HStack>
        </Pressable>
      </CardHeader>

      {isOpen && <CardContent>{children}</CardContent>}
    </Card>
  );
};

export default CollapseCard;

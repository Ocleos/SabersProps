import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { type ComponentProps, useState } from 'react';
import { Pressable, type View } from 'react-native';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { Card, CardContent, CardHeader, CardTitle } from '~ui/card';
import { HStack } from '~ui/stack';

interface ICollapseCard extends ComponentProps<typeof View> {
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
            {isOpen ? <ChevronUp color={colorsTheme.primary[500]} /> : <ChevronDown color={colorsTheme.primary[500]} />}
          </HStack>
        </Pressable>
      </CardHeader>

      {isOpen && <CardContent>{children}</CardContent>}
    </Card>
  );
};

export default CollapseCard;

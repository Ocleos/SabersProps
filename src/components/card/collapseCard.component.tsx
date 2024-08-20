import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react-native';
import { type ComponentProps, useState } from 'react';
import { Pressable, type View } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from '~rnr/ui/card';
import { HStack } from '~rnr/ui/stack';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { DEFAULT_ICON_SIZE } from '~src/utils/icons.utils';

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

import { Accordion } from 'heroui-native/accordion';
import { useThemeColor } from 'heroui-native/hooks';
import { Typography } from 'heroui-native/text';
import type React from 'react';

type AccordionWrapperProps = {
  title: string;
  itemValue: string;
  children: React.ReactNode;
  isOpen?: boolean;
};

const AccordionWrapper = (props: AccordionWrapperProps) => {
  const [accentColor] = useThemeColor(['accent']);

  const { title, itemValue, children, isOpen } = props;

  return (
    <Accordion defaultValue={isOpen ? itemValue : ''} selectionMode='single' variant='surface'>
      <Accordion.Item value={itemValue}>
        <Accordion.Trigger className='p-4'>
          <Typography className='font-medium text-lg'>{title}</Typography>
          <Accordion.Indicator iconProps={{ color: accentColor, size: 24 }} />
        </Accordion.Trigger>

        <Accordion.Content className='px-4'>{children}</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default AccordionWrapper;

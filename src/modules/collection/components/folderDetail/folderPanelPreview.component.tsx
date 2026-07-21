import { Card } from 'heroui-native/card';
import { useThemeColor } from 'heroui-native/hooks';
import { Typography } from 'heroui-native/text';
import { cn } from 'heroui-native/utils';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import AccordionWrapper from '~src/components/ui/accordionWrapper.component';
import { HStack, VStack } from '~src/components/ui/stack.component';
import type { Prop } from '../../types/prop.type';
import { propStates } from '../../types/propState.type';
import { propTypes } from '../../types/propType.type';
import { computeFolderLayout } from '../../utils/folderPanel.utils';

type FolderPanelPreviewProps = {
  props: Prop[];
};

const MiniPropCard: React.FC<{ prop: Prop }> = ({ prop }) => {
  const PropIcon = propTypes[prop.type].icon;
  const [accentColor] = useThemeColor(['accent']);

  return (
    <Card className={cn('flex-1 border-2', propStates[prop.state].colorScheme.border)}>
      <Card.Body className='items-center gap-1'>
        <PropIcon color={accentColor} height={24} width={24} />
        <Typography numberOfLines={1} type='body-sm'>
          {prop.name}
        </Typography>
      </Card.Body>
    </Card>
  );
};

const EmptySlot: React.FC = () => <Card className='flex-1 border border-muted border-dashed' />;

const FolderPanelPreview: React.FC<FolderPanelPreviewProps> = ({ props }) => {
  const { t } = useTranslation();

  const rows = useMemo(() => computeFolderLayout(props), [props]);

  return (
    <View className='pb-4'>
      <AccordionWrapper itemValue='preview' title={t('collection:FOLDERS.LABELS.PREVIEW')}>
        <VStack className='gap-2'>
          {rows.map((row, index) =>
            row.type === 'full' ? (
              <MiniPropCard key={row.prop.id ?? index} prop={row.prop} />
            ) : (
              <HStack className='gap-2' key={row.left?.id ?? row.right?.id ?? index}>
                {row.left ? <MiniPropCard prop={row.left} /> : <EmptySlot />}
                {row.right ? <MiniPropCard prop={row.right} /> : <EmptySlot />}
              </HStack>
            ),
          )}
        </VStack>
      </AccordionWrapper>
    </View>
  );
};

export default FolderPanelPreview;

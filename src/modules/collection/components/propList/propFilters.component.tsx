import { useThemeColor } from 'heroui-native/hooks';
import { TagGroup } from 'heroui-native/tag-group';
import { Typography } from 'heroui-native/text';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '~src/components/ui/icon.component';
import { VStack } from '~src/components/ui/stack.component';
import { useCollectionStore } from '~src/modules/collection/stores/collection.store';
import { type PropType, propTypes } from '~src/modules/collection/types/propType.type';
import { type PropState, propStates } from '../../types/propState.type';

const PropFilters: React.FC = () => {
  const { t } = useTranslation();

  const { bottom } = useSafeAreaInsets();

  const { filters, updateTypeFilter, updateStateFilter } = useCollectionStore();

  const [accentSoftForegroundColor, textFieldForegroundColor] = useThemeColor([
    'accent-soft-foreground',
    'field-foreground',
  ]);

  return (
    <VStack className='gap-4 p-4' style={{ marginBottom: bottom }}>
      <VStack className='gap-2'>
        <Typography type='h6'>{t('collection:LABELS.TYPE')}</Typography>

        <TagGroup
          onSelectionChange={(keys) => updateTypeFilter(new Set(keys as Iterable<PropType>))}
          selectedKeys={filters.typesFilter}
          selectionMode='multiple'>
          <TagGroup.List>
            {Object.entries(propTypes).map(([key, value]) => {
              const id = Number(key) as PropType;
              const isSelected = filters.typesFilter.has(id);
              return (
                <TagGroup.Item id={id} key={key}>
                  <value.icon
                    color={isSelected ? accentSoftForegroundColor : textFieldForegroundColor}
                    height={24}
                    width={24}
                  />
                  <TagGroup.ItemLabel>{value.label}</TagGroup.ItemLabel>
                </TagGroup.Item>
              );
            })}
          </TagGroup.List>
        </TagGroup>
      </VStack>

      <VStack className='gap-2'>
        <Typography type='h6'>{t('collection:LABELS.STATE')}</Typography>

        <TagGroup
          onSelectionChange={(keys) => updateStateFilter(new Set(keys as Iterable<PropState>))}
          selectedKeys={filters.statesFilter}
          selectionMode='multiple'>
          <TagGroup.List>
            {Object.entries(propStates).map(([key, value]) => {
              const id = Number(key) as PropState;
              const isSelected = filters.statesFilter.has(id);
              return (
                <TagGroup.Item className={isSelected ? value.colorScheme.bg : ''} id={id} key={key}>
                  <Icon as={value.icon} className={isSelected ? value.colorScheme.text : 'text-field-foreground'} />
                  <TagGroup.ItemLabel className={isSelected ? value.colorScheme.text : ''}>
                    {value.label}
                  </TagGroup.ItemLabel>
                </TagGroup.Item>
              );
            })}
          </TagGroup.List>
        </TagGroup>
      </VStack>
    </VStack>
  );
};

export default PropFilters;

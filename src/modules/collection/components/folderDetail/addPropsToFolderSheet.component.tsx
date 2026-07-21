import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useIsFocused } from 'expo-router';
import { Button } from 'heroui-native/button';
import { Select } from 'heroui-native/select';
import { Spinner } from 'heroui-native/spinner';
import { useToast } from 'heroui-native/toast';
import { PlusIcon, SaveIcon } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmptyComponent from '~src/components/empty/empty.component';
import { Icon } from '~src/components/ui/icon.component';
import { VStack } from '~src/components/ui/stack.component';
import { foldersKeys, propsKeys } from '~src/utils/queryKeys.utils';
import { getToastErrorConfig, getToastSuccessConfig } from '~src/utils/toast.utils';
import { assignPropsToFolder, getUnassignedProps } from '../../services/folders.api';

type SelectOption = { value: string; label: string } | undefined;

type AddPropsToFolderSheetProps = {
  folderId: string;
  currentPropsCount: number;
};

const AddPropsToFolderSheet: React.FC<AddPropsToFolderSheetProps> = ({ currentPropsCount, folderId }) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { bottom } = useSafeAreaInsets();

  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { data: unassignedProps, isLoading } = useQuery({
    enabled: isFocused,
    queryFn: async () => await getUnassignedProps(),
    queryKey: propsKeys.unassigned(),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: () =>
      assignPropsToFolder(
        selectedOptions.filter((option) => option != null).map((option) => option.value),
        folderId,
        currentPropsCount,
      ),
    onError: () => {
      toast.show(getToastErrorConfig({ description: t('common:FORMS.ADD_ERROR') }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foldersKeys.root() });
      queryClient.invalidateQueries({ queryKey: propsKeys.root() });
      toast.show(getToastSuccessConfig({ description: t('common:FORMS.ADD_SUCCESS') }));
      setSelectedOptions([]);
      setIsOpen(false);
    },
  });

  return (
    <Select
      className='absolute right-4 bottom-4'
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      onValueChange={setSelectedOptions}
      presentation='bottom-sheet'
      selectionMode='multiple'
      value={selectedOptions}>
      <Select.Trigger asChild variant='unstyled'>
        <Button className='z-20 h-16 w-16 rounded-full' isIconOnly variant='primary'>
          <Icon as={PlusIcon} className='text-accent-foreground' />
        </Button>
      </Select.Trigger>
      <Select.Portal>
        <Select.Overlay />
        <Select.Content
          contentContainerClassName='h-full'
          enableDynamicSizing={false}
          enableOverDrag={false}
          presentation='bottom-sheet'
          snapPoints={['75%']}>
          <VStack className='gap-4' style={{ marginBottom: bottom }}>
            {isLoading ? (
              <View className='items-center p-6'>
                <Spinner />
              </View>
            ) : unassignedProps && unassignedProps.length === 0 ? (
              <EmptyComponent title={t('collection:FOLDERS.EMPTY_UNASSIGNED_PROPS')} />
            ) : (
              <BottomSheetScrollView>
                {unassignedProps?.map((prop) => (
                  <Select.Item key={prop.id} label={prop.name} value={prop.id ?? ''} />
                ))}
              </BottomSheetScrollView>
            )}

            <Button isDisabled={isPending || selectedOptions.length === 0} onPress={() => mutate()}>
              <Icon as={SaveIcon} className='text-accent-foreground' />
              <Button.Label>{t('common:COMMON.SAVE')}</Button.Label>
            </Button>
          </VStack>
        </Select.Content>
      </Select.Portal>
    </Select>
  );
};

export default AddPropsToFolderSheet;

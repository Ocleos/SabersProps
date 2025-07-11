import { HStack, Toggle, ToggleIcon } from '@sabersprops/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { KeyRoundIcon, ShoppingBagIcon, TagIcon } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CollapseCard from '~src/components/card/collapseCard.component';
import type { PropAccessory } from '~src/modules/collection/models/propAccessory.model';
import type { PropDetail } from '~src/modules/collection/models/propDetail.model';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { ACCESSORIES_TABLE, upsertData } from '~src/utils/supabase.utils';

interface IAccessoriesCard {
  prop: PropDetail;
}

const AccessoriesCard: React.FC<IAccessoriesCard> = ({ prop }) => {
  const { t } = useTranslation(['collection']);
  const queryClient = useQueryClient();

  const { accessories } = prop;

  const [hasBag, setHasBag] = useState<boolean>(accessories?.bag ?? false);
  const [hasKeyring, setHasKeyring] = useState<boolean>(accessories?.keyring ?? false);
  const [hasDisplayPlaque, setHasDisplayPlaque] = useState<boolean>(accessories?.displayPlaque ?? false);

  const { mutate } = useMutation({
    mutationFn: (data: PropAccessory) => upsertData<PropAccessory>(ACCESSORIES_TABLE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propsKeys.todos() });
    },
  });

  const onUpdateAccessory = async (value: boolean, index: number) => {
    const valueToSave = accessories ?? {
      bag: false,
      displayPlaque: false,
      id: prop.id,
      keyring: false,
    };

    switch (index) {
      case 0:
        setHasBag(value);
        valueToSave.bag = value;
        break;
      case 1:
        setHasKeyring(value);
        valueToSave.keyring = value;
        break;
      case 2:
        setHasDisplayPlaque(value);
        valueToSave.displayPlaque = value;
        break;
    }

    await mutate(valueToSave);
  };

  return (
    <CollapseCard isOpened={true} title={t('collection:CATEGORIES.ACCESSORIES')}>
      <HStack className='gap-4'>
        <Toggle onPressedChange={(pressed) => onUpdateAccessory(pressed, 0)} pressed={hasBag} variant={'outline'}>
          <ToggleIcon icon={ShoppingBagIcon} />
        </Toggle>

        <Toggle onPressedChange={(pressed) => onUpdateAccessory(pressed, 1)} pressed={hasKeyring} variant={'outline'}>
          <ToggleIcon icon={KeyRoundIcon} />
        </Toggle>

        <Toggle
          onPressedChange={(pressed) => onUpdateAccessory(pressed, 2)}
          pressed={hasDisplayPlaque}
          variant={'outline'}>
          <ToggleIcon icon={TagIcon} />
        </Toggle>
      </HStack>
    </CollapseCard>
  );
};

export default AccessoriesCard;

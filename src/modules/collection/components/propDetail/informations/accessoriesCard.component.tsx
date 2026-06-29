import { useMutation, useQueryClient } from '@tanstack/react-query';
import { KeyRoundIcon, ShoppingBagIcon, TagIcon } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AccordionWrapper from '~src/components/ui/accordionWrapper.component';
import { HStack } from '~src/components/ui/stack.component';
import Toggle from '~src/components/ui/toggle.component';
import type { PropAccessory } from '~src/modules/collection/types/propAccessory.type';
import type { PropDetail } from '~src/modules/collection/types/propDetail.type';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { ACCESSORIES_TABLE, upsertData } from '~src/utils/supabase.utils';

type AccessoriesCardProps = {
  prop: PropDetail;
};

const AccessoriesCard: React.FC<AccessoriesCardProps> = ({ prop }) => {
  const { t } = useTranslation();
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
    <AccordionWrapper isOpen={true} itemValue='accessories' title={t('collection:CATEGORIES.ACCESSORIES')}>
      <HStack className='gap-4'>
        <Toggle
          icon={ShoppingBagIcon}
          isPressed={hasBag}
          onPressedChange={(pressed) => onUpdateAccessory(pressed, 0)}
        />

        <Toggle
          icon={KeyRoundIcon}
          isPressed={hasKeyring}
          onPressedChange={(pressed) => onUpdateAccessory(pressed, 1)}
        />

        <Toggle
          icon={TagIcon}
          isPressed={hasDisplayPlaque}
          onPressedChange={(pressed) => onUpdateAccessory(pressed, 2)}
        />
      </HStack>
    </AccordionWrapper>
  );
};

export default AccessoriesCard;

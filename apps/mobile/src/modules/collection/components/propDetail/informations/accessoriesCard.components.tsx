import { HStack, Toggle, ToggleIcon } from '@sabersprops/ui';
import { KeyRoundIcon, ShoppingBagIcon, TagIcon } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import CollapseCard from '~src/components/card/collapseCard.component';
import type { PropAccessory } from '~src/modules/collection/models/propAccessory.model';
import type { PropDetail } from '~src/modules/collection/models/propDetail.model';
import { ACCESSORIES_URL_ENDPOINT, PROPS_URL_ENDPOINT, upsertData } from '~src/utils/supabase.utils';

interface IAccessoriesCard {
  prop: PropDetail;
}

const AccessoriesCard: React.FC<IAccessoriesCard> = ({ prop }) => {
  const { t } = useTranslation(['collection']);

  const { accessories } = prop;

  const [hasBag, setHasBag] = useState<boolean>(accessories?.bag ?? false);
  const [hasKeyring, setHasKeyring] = useState<boolean>(accessories?.keyring ?? false);
  const [hasDisplayPlaque, setHasDisplayPlaque] = useState<boolean>(accessories?.displayPlaque ?? false);

  const { trigger } = useSWRMutation(ACCESSORIES_URL_ENDPOINT, upsertData<PropAccessory>);
  const { mutate } = useSWRConfig();

  const onUpdateAccessory = async (value: boolean, index: number) => {
    const valueToSave = accessories ?? {
      id: prop.id,
      bag: false,
      keyring: false,
      displayPlaque: false,
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

    await trigger(valueToSave);
    mutate([PROPS_URL_ENDPOINT, prop.id]);
  };

  return (
    <CollapseCard title={t('collection:CATEGORIES.ACCESSORIES')} isOpened={true}>
      <HStack className='gap-4'>
        <Toggle pressed={hasBag} onPressedChange={(pressed) => onUpdateAccessory(pressed, 0)} variant={'outline'}>
          <ToggleIcon icon={ShoppingBagIcon} />
        </Toggle>

        <Toggle pressed={hasKeyring} onPressedChange={(pressed) => onUpdateAccessory(pressed, 1)} variant={'outline'}>
          <ToggleIcon icon={KeyRoundIcon} />
        </Toggle>

        <Toggle
          pressed={hasDisplayPlaque}
          onPressedChange={(pressed) => onUpdateAccessory(pressed, 2)}
          variant={'outline'}>
          <ToggleIcon icon={TagIcon} />
        </Toggle>
      </HStack>
    </CollapseCard>
  );
};

export default AccessoriesCard;

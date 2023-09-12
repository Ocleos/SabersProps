import { Cpu, Film, Shapes, User2, Wrench } from 'lucide-react-native';
import { VStack } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CollapseCard from '~src/components/card/collapseCard.component';
import LabelIcon from '~src/components/label/labelIcon.component';
import { PropDetail } from '../../../models/propDetail.model';

interface IInformationsCard {
  prop: PropDetail;
}

const InformationsCard: React.FC<IInformationsCard> = ({ prop }) => {
  const { t } = useTranslation(['collection']);

  return (
    <CollapseCard title={t('collection:CATEGORIES.INFORMATIONS')} isOpened={true}>
      <VStack space={2}>
        <LabelIcon label={prop.manufacturer} icon={{ as: Wrench }} />
        <LabelIcon label={prop.chassisDesigner ?? ''} icon={{ as: Shapes }} />
        <LabelIcon label={prop.soundboard ?? ''} icon={{ as: Cpu }} />
        <LabelIcon label={prop.character ?? ''} icon={{ as: User2 }} />
        <LabelIcon label={prop.apparition ?? ''} icon={{ as: Film }} />
      </VStack>
    </CollapseCard>
  );
};

export default InformationsCard;

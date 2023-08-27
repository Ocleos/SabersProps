import { MaterialCommunityIcons } from '@expo/vector-icons';
import CollapseCard from '@src/components/card/collapseCard.component';
import LabelIcon from '@src/components/label/labelIcon.component';
import { VStack } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PropDetail } from '../../../models/propDetail.model';

interface IInformationsCard {
  prop: PropDetail;
}

const InformationsCard: React.FC<IInformationsCard> = ({ prop }) => {
  const { t } = useTranslation(['collection']);

  return (
    <CollapseCard title={t('collection:CATEGORIES.INFORMATIONS')} isOpened={true}>
      <VStack space={2}>
        <LabelIcon label={prop.manufacturer} icon={{ as: MaterialCommunityIcons, name: 'wrench-outline' }} />
        <LabelIcon label={prop.chassisDesigner ?? ''} icon={{ as: MaterialCommunityIcons, name: 'shape' }} />
        <LabelIcon label={prop.soundboard ?? ''} icon={{ as: MaterialCommunityIcons, name: 'memory' }} />
        <LabelIcon label={prop.character ?? ''} icon={{ as: MaterialCommunityIcons, name: 'account-outline' }} />
        <LabelIcon label={prop.apparition ?? ''} icon={{ as: MaterialCommunityIcons, name: 'movie-outline' }} />
      </VStack>
    </CollapseCard>
  );
};

export default InformationsCard;

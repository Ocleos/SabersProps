import { Ionicons } from '@expo/vector-icons';
import { SabersPropsIcon } from '@src/assets/sabersProps.icon';
import CollapseCard from '@src/components/card/collapseCard.component';
import LabelIcon from '@src/components/label/labelIcon.component';
import { propStates } from '@src/models/propState.model';
import { propTypes } from '@src/models/propType.model';
import { iconStyle } from '@src/theme/icon.theme';
import { Badge, HStack, IBadgeProps, Icon, VStack } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PropDetail } from '../../models/propDetail.model';

interface IInformationsCard {
  prop: PropDetail;
}

const InformationsCard: React.FC<IInformationsCard> = ({ prop }) => {
  const { t } = useTranslation(['collection']);

  const badgeStyle: IBadgeProps = {
    _text: { fontSize: 'md' },
    p: 2,
    borderRadius: 'sm',
  };

  return (
    <CollapseCard title={t('collection:CATEGORIES.INFORMATIONS')} isOpened={true}>
      <VStack space={2}>
        <HStack space={4} mb={2} alignItems={'center'}>
          <Badge
            variant={'outline'}
            colorScheme={'primary'}
            {...badgeStyle}
            leftIcon={<Icon as={SabersPropsIcon} name={propTypes[prop.type].iconName} {...iconStyle} />}
          >
            {propTypes[prop.type].label}
          </Badge>

          <Badge variant={'subtle'} colorScheme={propStates[prop.state].colorScheme} {...badgeStyle}>
            {propStates[prop.state].label}
          </Badge>
        </HStack>

        <LabelIcon label={prop.manufacturer} icon={{ as: Ionicons, name: 'build' }} />
        <LabelIcon label={prop.chassisDesigner ?? ''} icon={{ as: Ionicons, name: 'shapes' }} />
        <LabelIcon label={prop.soundboard ?? ''} icon={{ as: Ionicons, name: 'hardware-chip-sharp' }} />
        <LabelIcon label={prop.character ?? ''} icon={{ as: Ionicons, name: 'person' }} />
        <LabelIcon label={prop.apparition ?? ''} icon={{ as: Ionicons, name: 'film' }} />
      </VStack>
    </CollapseCard>
  );
};

export default InformationsCard;

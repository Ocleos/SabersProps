import { VStack } from '@sabersprops/ui';
import { CpuIcon, ShapesIcon, User2Icon, WrenchIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import CollapseCard from '~src/components/card/collapseCard.component';
import LabelIcon from '~src/components/label/labelIcon.component';
import type { PropDetail } from '~src/modules/collection/models/propDetail.model';

interface IInformationsCard {
  prop: PropDetail;
}

const InformationsCard: React.FC<IInformationsCard> = ({ prop }) => {
  const { t } = useTranslation(['collection']);

  return (
    <CollapseCard isOpened={true} title={t('collection:CATEGORIES.INFORMATIONS')}>
      <VStack className='gap-2'>
        <LabelIcon icon={WrenchIcon} label={prop.manufacturer} />
        <LabelIcon icon={ShapesIcon} label={prop.chassisDesigner ?? ''} />
        <LabelIcon icon={CpuIcon} label={prop.soundboard ?? ''} />
        <LabelIcon icon={User2Icon} label={prop.character ?? ''} />
      </VStack>
    </CollapseCard>
  );
};

export default InformationsCard;

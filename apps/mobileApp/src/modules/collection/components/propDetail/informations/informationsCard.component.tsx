import { CpuIcon, ShapesIcon, User2Icon, WrenchIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { VStack } from '~rnr/ui/stack';
import CollapseCard from '~src/components/card/collapseCard.component';
import LabelIcon from '~src/components/label/labelIcon.component';
import type { PropDetail } from '~src/modules/collection/models/propDetail.model';

interface IInformationsCard {
  prop: PropDetail;
}

const InformationsCard: React.FC<IInformationsCard> = ({ prop }) => {
  const { t } = useTranslation(['collection']);

  return (
    <CollapseCard title={t('collection:CATEGORIES.INFORMATIONS')} isOpened={true}>
      <VStack className='gap-2'>
        <LabelIcon label={prop.manufacturer} icon={WrenchIcon} />
        <LabelIcon label={prop.chassisDesigner ?? ''} icon={ShapesIcon} />
        <LabelIcon label={prop.soundboard ?? ''} icon={CpuIcon} />
        <LabelIcon label={prop.character ?? ''} icon={User2Icon} />
      </VStack>
    </CollapseCard>
  );
};

export default InformationsCard;

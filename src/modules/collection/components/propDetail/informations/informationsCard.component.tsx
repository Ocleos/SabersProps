import { Cpu, Shapes, User2, Wrench } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { VStack } from '~rnr/ui/stack';
import CollapseCard from '~src/components/card/collapseCard.component';
import LabelIcon from '~src/components/label/labelIcon.component';
import type { PropDetail } from '../../../models/propDetail.model';

interface IInformationsCard {
  prop: PropDetail;
}

const InformationsCard: React.FC<IInformationsCard> = ({ prop }) => {
  const { t } = useTranslation(['collection']);

  return (
    <CollapseCard title={t('collection:CATEGORIES.INFORMATIONS')} isOpened={true}>
      <VStack className='gap-2'>
        <LabelIcon label={prop.manufacturer} icon={Wrench} />
        <LabelIcon label={prop.chassisDesigner ?? ''} icon={Shapes} />
        <LabelIcon label={prop.soundboard ?? ''} icon={Cpu} />
        <LabelIcon label={prop.character ?? ''} icon={User2} />
      </VStack>
    </CollapseCard>
  );
};

export default InformationsCard;

import { CpuIcon, ShapesIcon, User2Icon, WrenchIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import LabelIcon from '~src/components/label/labelIcon.component';
import AccordionWrapper from '~src/components/ui/accordionWrapper.component';
import { VStack } from '~src/components/ui/stack.component';
import type { PropDetail } from '~src/modules/collection/types/propDetail.type';

type InformationsCard = {
  isLoading?: boolean;
  prop?: PropDetail;
};

const InformationsCard: React.FC<InformationsCard> = ({ isLoading, prop }) => {
  const { t } = useTranslation();

  return (
    <AccordionWrapper isOpen={true} itemValue='informations' title={t('collection:CATEGORIES.INFORMATIONS')}>
      <VStack className='gap-2'>
        <LabelIcon icon={WrenchIcon} isLoading={isLoading} label={prop?.manufacturer ?? ''} />
        <LabelIcon icon={ShapesIcon} isLoading={isLoading} label={prop?.chassisDesigner ?? ''} />
        <LabelIcon icon={CpuIcon} isLoading={isLoading} label={prop?.soundboard ?? ''} />
        <LabelIcon icon={User2Icon} isLoading={isLoading} label={prop?.character ?? ''} />
      </VStack>
    </AccordionWrapper>
  );
};

export default InformationsCard;

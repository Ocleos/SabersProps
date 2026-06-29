import { useRouter } from 'expo-router';
import { Card } from 'heroui-native/card';
import { PressableFeedback } from 'heroui-native/pressable-feedback';
import { ChevronRightIcon } from 'lucide-react-native';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '~src/components/ui/icon.component';
import { HStack, VStack } from '~src/components/ui/stack.component';
import type { PropDetail } from '~src/modules/collection/types/propDetail.type';

type ComponentCardsProps = {
  prop: PropDetail;
};

const ComponentCard: React.FC<ComponentCardsProps> = ({ prop }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <PressableFeedback onPress={() => router.navigate(`/(root)/collection/${prop.id}/components`)}>
      <Card>
        <Card.Body>
          <HStack className='items-center justify-between'>
            <VStack>
              <Card.Title>{t('collection:CATEGORIES.COMPONENTS')}</Card.Title>
              <Card.Description>
                {t('collection:LABELS.COMPONENTS', { count: prop.components.length })}
              </Card.Description>
            </VStack>
            <Icon as={ChevronRightIcon} className='text-accent' />
          </HStack>
        </Card.Body>
      </Card>
    </PressableFeedback>
  );
};

export default ComponentCard;

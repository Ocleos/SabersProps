import { useRouter } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import FilterSearchWrapper from '~src/components/list/filterSearchWrapper.component';
import FlashListWrapper from '~src/components/list/flashListWrapper.component';
import FabButton from '~src/components/ui/fabButton.component';
import { Icon } from '~src/components/ui/icon.component';
import { VStack } from '~src/components/ui/stack.component';
import PropComponentCard from '../components/propDetail/components/propComponentCard.component';
import { usePropDetailStore } from '../stores/propDetail.store';
import { onFilterComponents } from '../utils/props.utils';

const PropDetailComponentsPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { propDetail, searchValue, setSearchValue, setSelectedComponent } = usePropDetailStore();

  const components = useMemo(() => onFilterComponents(propDetail?.components, searchValue), [propDetail, searchValue]);

  return (
    <PageLayout isScrollable={false} title={`${t('collection:CATEGORIES.COMPONENTS')} - ${propDetail?.name}`}>
      <VStack className='flex-1 gap-4'>
        <FilterSearchWrapper onSearchValue={setSearchValue} searchValue={searchValue} />

        <FlashListWrapper
          data={components}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          renderItem={({ item }) => <PropComponentCard propComponent={item} />}
        />
      </VStack>

      <FabButton
        onPress={() => {
          setSelectedComponent(undefined);
          router.navigate(`/(root)/collection/${propDetail?.id}/form`);
        }}>
        <Icon as={PlusIcon} className='text-accent-foreground' />
      </FabButton>
    </PageLayout>
  );
};

export default PropDetailComponentsPage;

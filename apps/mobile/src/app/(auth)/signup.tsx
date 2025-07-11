import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import SignUpPage from '~src/modules/auth/pages/signUp.page';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <PageLayout hasDrawerToggle={false} isScrollable={true} title={t('routing:ROUTING.AUTH.NEW_ACCOUNT')}>
      <SignUpPage />
    </PageLayout>
  );
};

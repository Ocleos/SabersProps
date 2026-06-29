import { Separator } from 'heroui-native/separator';
import { Typography } from 'heroui-native/text';
import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import { VStack } from '~src/components/ui/stack.component';
import { applicationVersion } from '~src/utils/platforms.utils';
import ProfileSection from '../components/profileSection.component';
import SettingsSection from '../components/settingsSection.component';

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageLayout isScrollable={true} title={t('profile:ROUTING.TITLE')}>
      <VStack className='gap-4'>
        <ProfileSection />

        <Separator />

        <SettingsSection />

        <Separator />

        {applicationVersion && <Typography className='text-center'>{`v${applicationVersion}`}</Typography>}
      </VStack>
    </PageLayout>
  );
};

export default ProfilePage;

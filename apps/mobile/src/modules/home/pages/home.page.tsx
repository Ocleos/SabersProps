import { HStack } from '@sabersprops/ui';
import HomeButton from '~src/modules/home/components/homeButton.component';
import { getModules } from '~src/modules/home/utils/home.utils';

const HomePage = () => {
  const modules = getModules();

  return (
    <HStack className='flex-wrap'>
      {modules.map((module) => (
        <HomeButton key={module.id} module={module} />
      ))}
    </HStack>
  );
};

export default HomePage;

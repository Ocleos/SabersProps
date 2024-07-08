import { useMemo } from 'react';
import { HStack } from '~rnr/ui/stack';
import HomeButton from '../components/homeButton.component';
import { getModules } from '../utils/home.utils';

const HomePage = () => {
  const modules = useMemo(getModules, []);

  return (
    <HStack className='flex-wrap'>
      {modules.map((module) => (
        <HomeButton key={module.id} module={module} />
      ))}
    </HStack>
  );
};

export default HomePage;

import { map } from 'lodash';
import { useMemo } from 'react';
import { HStack } from '~ui/stack';
import HomeButton from '../components/homeButton.component';
import { getModules } from '../utils/home.utils';

const HomePage = () => {
  const modules = useMemo(getModules, []);

  return (
    <HStack className='flex-wrap'>
      {map(modules, (module, index) => (
        <HomeButton key={`homeModule${index}`} module={module} />
      ))}
    </HStack>
  );
};

export default HomePage;

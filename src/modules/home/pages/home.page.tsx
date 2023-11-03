import { HStack } from '@gluestack-ui/themed';
import { map } from 'lodash';
import React, { useMemo } from 'react';
import HomeButton from '../components/homeButton.component';
import { getModules } from '../utils/home.utils';

const HomePage = () => {
  const modules = useMemo(getModules, []);

  return (
    <HStack flexWrap='wrap' m='-$2'>
      {map(modules, (module, index) => (
        <HomeButton key={`homeModule${index}`} module={module} />
      ))}
    </HStack>
  );
};

export default HomePage;

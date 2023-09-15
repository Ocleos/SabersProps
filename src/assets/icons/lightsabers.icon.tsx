import { createIcon } from '@gluestack-ui/themed';
import * as React from 'react';
import { Path } from 'react-native-svg';

const LightsabersIcon = createIcon({
  viewBox: '0 0 100 100',
  path: (
    <>
      <Path
        d='M94.521842 6.8571585Q93.459268 5.7070147 92.290437 6.7526L27.473436 68.755808l5.206611 2.091171L94.521842 8.8437701q.956316-1.0455848 0-1.9866116zM28.642267 79.002544l-.531287-.731909 5.206611-5.123368-9.244391-3.868666-2.550178 2.509405-.743801-.627351-1.275089 1.359261.637545.627351-2.656435 2.613963L24.0732 82.1393l2.656434-2.613963.637544.73191zm-20.29516 8.364683 9.138135-9.096592-1.275089-1.254703-9.1381341 8.992034zm2.550178 2.613963 9.244392-9.096592-1.381346-1.359261-9.138135 9.096592zm10.625737-7.84189-9.244392 8.992034 1.275089 1.359261 9.244392-8.992034zM6.4344746 87.994578l-1.3813459 1.359261 5.2066113 5.123368 1.381346-1.359261ZM5.4781582 5.6024561q.9563164-1.1501438 2.1251478-.1045585L70.295159 68.023899l-3.825265 3.973224L5.4781582 7.6936267q-.9563164-1.1501438 0-2.0911706zM81.877214 77.434167l10.413223 10.769528-1.275089 1.359261 1.275089 1.359261L88.358914 95l-1.168831-1.359261L85.808737 95 75.501771 84.125913Zm-3.187722-2.091171 1.381346 1.359261-5.312869 5.437043-1.168831-1.254702zm-2.550177-2.613963 1.275089 1.359261-5.206612 5.332485-1.275088-1.359261zm-7.119244 1.986612-1.275089-1.359261 3.931523-4.077783 1.275089 1.359261 1.168831-1.359261 1.381346 1.359261-6.4817 6.796305-1.275089-1.359261z'
        fill='currentColor'
      />
    </>
  ),
});

export default LightsabersIcon;

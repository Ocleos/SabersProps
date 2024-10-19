import { Stack } from 'expo-router';
import { appRoutes } from '~src/router/routes.utils';

export const unstable_settings = {
  initialRouteName: appRoutes.collection.root,
};

export default () => {
  return <Stack />;
};

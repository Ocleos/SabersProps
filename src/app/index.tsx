import { Redirect, useRootNavigationState } from 'expo-router';
import { appRoutes } from '~src/router/routes.utils';

export default () => {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return <Redirect href={appRoutes.home} />;
};

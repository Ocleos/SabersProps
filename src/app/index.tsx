import { Redirect, useRootNavigationState } from 'expo-router';

export default () => {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return <Redirect href='/(root)/home' />;
};

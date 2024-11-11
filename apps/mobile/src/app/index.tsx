import { router } from 'expo-router';
import { useEffect } from 'react';
import { AppState } from 'react-native';
import { appRoutes } from '~src/router/routes.utils';
import { supabase } from '~src/utils/supabase.utils';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default () => {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace(appRoutes.home);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace(appRoutes.home);
      } else {
        router.replace(appRoutes.auth.login);
      }
    });
  }, []);
};

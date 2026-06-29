import { Stack } from 'expo-router';

export default () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack screenOptions={{ headerShown: true }} />
    </>
  );
};

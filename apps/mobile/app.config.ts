import 'dotenv/config';
import type { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'SabersProps',
  slug: 'SabersProps',
  version: '1.8.1',
  owner: 'ocleos',
  scheme: 'sabersprops',
  jsEngine: 'hermes',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#000000',
  },
  assetBundlePatterns: ['**/*'],
  android: {
    package: 'fr.ocleos.sabersprops',
    icon: './assets/icon.png',
    adaptiveIcon: {
      foregroundImage: './assets/adaptiveIconForeground.png',
      backgroundImage: './assets/adaptiveIconBackground.png',
    },
  },
  ios: {
    bundleIdentifier: 'fr.ocleos.sabersprops',
    supportsTablet: true,
  },
  web: {
    bundler: 'metro',
    favicon: './assets/favicon.png',
  },
  updates: {
    url: 'https://u.expo.dev/c10d5799-2d0f-4239-bf9a-f9278fa20c1c',
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
  plugins: [
    [
      'expo-build-properties',
      {
        android: {
          enableProguardInReleaseBuilds: true,
          enableShrinkResourcesInReleaseBuilds: true,
        },
      },
    ],
  ],
  extra: {
    supabaseApiUrl: 'https://pnfeltfqgvkdgyeqtddd.supabase.co',
    supabaseApiKey: process.env.supabaseApiKey,
    eas: {
      projectId: 'c10d5799-2d0f-4239-bf9a-f9278fa20c1c',
    },
  },
});

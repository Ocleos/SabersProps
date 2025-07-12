import type { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  android: {
    adaptiveIcon: {
      backgroundImage: './assets/adaptiveIconBackground.png',
      foregroundImage: './assets/adaptiveIconForeground.png',
    },
    icon: './assets/icon.png',
    package: 'fr.ocleos.sabersprops',
  },
  assetBundlePatterns: ['**/*'],
  extra: {
    eas: {
      projectId: 'c10d5799-2d0f-4239-bf9a-f9278fa20c1c',
    },
    supabaseApiKey: process.env.supabaseApiKey,
    supabaseApiUrl: 'https://pnfeltfqgvkdgyeqtddd.supabase.co',
  },
  icon: './assets/icon.png',
  ios: {
    bundleIdentifier: 'fr.ocleos.sabersprops',
    supportsTablet: true,
  },
  jsEngine: 'hermes',
  name: 'SabersProps',
  orientation: 'portrait',
  owner: 'ocleos',
  plugins: [
    [
      'expo-build-properties',
      {
        android: {
          enableProguardInReleaseBuilds: true,
          enableShrinkResourcesInReleaseBuilds: false,
        },
      },
    ],
    [
      'expo-splash-screen',
      {
        backgroundColor: '#000000',
        image: './assets/splash-icon.png',
        imageWidth: 288,
      },
    ],
    [
      'expo-router',
      {
        sitemap: false,
      },
    ],
  ],
  runtimeVersion: {
    policy: 'appVersion',
  },
  scheme: 'sabersprops',
  slug: 'SabersProps',
  updates: {
    url: 'https://u.expo.dev/c10d5799-2d0f-4239-bf9a-f9278fa20c1c',
  },
  userInterfaceStyle: 'automatic',
  version: '1.11.0',
  web: {
    bundler: 'metro',
    favicon: './assets/favicon.png',
  },
});

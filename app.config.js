export default {
  name: 'SabersProps',
  slug: 'SabersProps',
  version: '0.0.1',
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
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  android: {
    package: 'fr.ocleos.sabersprops',
    icon: './assets/icon.png',
    adaptiveIcon: {
      foregroundImage: './assets/adaptiveIconForeground.png',
      backgroundColor: './assets/adaptiveIconBackground.png',
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
  extra: {
    eas: {
      projectId: 'c10d5799-2d0f-4239-bf9a-f9278fa20c1c',
    },
  },
};

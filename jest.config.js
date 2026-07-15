const { resolveBabelOptions } = require('jest-expo/src/resolveBabelOptions');

/** @type {import('jest').Config} */
module.exports = {
  // React Query (batched notifyManager timers) and heroui-native's toast auto-dismiss both leave a
  // dangling timer past a test's own teardown. Neither is a leak in this repo's code — without this,
  // a single test file can hang for minutes waiting for Jest's own "did not exit" grace period.
  forceExit: true,
  moduleNameMapper: {
    '^~assets/(.*)$': '<rootDir>/assets/$1',
    '^~src/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'jest-expo',
  resolver: '<rootDir>/jest.resolver.js',
  setupFiles: ['<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    // Some RN libraries (lucide-react-native, uniwind, ...) ship ESM-only `.mjs` files that the
    // default jest-expo transform (`\.[jt]sx?$`) doesn't match.
    '\\.mjs$': ['babel-jest', resolveBabelOptions(__dirname)],
  },
  transformIgnorePatterns: [
    // Many RN ecosystem packages ship ESM-only builds under their "main"/"exports" entry, which
    // Jest doesn't transform by default (only entries matching the allowlist below are).
    '/node_modules/(?!(.pnpm|react-native|@react-native|@react-native-community|expo|@expo|@expo-google-fonts|react-navigation|@react-navigation|@sentry/react-native|native-base|standard-navigation|lucide-react-native|uniwind|heroui-native|@gorhom|@shopify|@wuba|echarts))',
  ],
};

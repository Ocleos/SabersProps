const { resolveBabelOptions } = require('jest-expo/src/resolveBabelOptions');

/** @type {import('jest').Config} */
module.exports = {
  moduleNameMapper: {
    '^~assets/(.*)$': '<rootDir>/assets/$1',
    '^~src/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'jest-expo',
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    // Some RN libraries (lucide-react-native, uniwind, ...) ship ESM-only `.mjs` files that the
    // default jest-expo transform (`\.[jt]sx?$`) doesn't match.
    '\\.mjs$': ['babel-jest', resolveBabelOptions(__dirname)],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(.pnpm|react-native|@react-native|@react-native-community|expo|@expo|@expo-google-fonts|react-navigation|@react-navigation|@sentry/react-native|native-base|standard-navigation|lucide-react-native|uniwind))',
  ],
};

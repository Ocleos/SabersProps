module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: '.',
          alias: {
            '~assets': './assets',
            '~src': './src',
          },
        },
      ],
      'expo-router/babel',
      'react-native-reanimated/plugin',
    ],
  };
};

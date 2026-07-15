/**
 * Combines two resolver behaviors that jest-expo's preset can only apply one at a time:
 *  - @react-native/jest-preset's resolver.js: strips react-native's own `exports` field so its
 *    submodules stay mockable.
 *  - react-native-worklets/jest/resolver.js: skips `.native.*` files for react-native-worklets so
 *    it resolves `platformChecker.ts` (which correctly detects `JEST_WORKER_ID`) instead of
 *    `platformChecker.native.ts` (hardcoded to `IS_JEST = false`), which otherwise makes it try to
 *    load the real native module and crash under Jest.
 */
module.exports = (request, options) => {
  const originalPackageFilter = options.packageFilter;

  let resolverOptions = {
    ...options,
    packageFilter: (pkg) => {
      const filteredPkg = originalPackageFilter ? originalPackageFilter(pkg) : pkg;

      if (filteredPkg.name === 'react-native') {
        delete filteredPkg.exports;
      }

      return filteredPkg;
    },
  };

  if (options.basedir.includes('react-native-worklets') || request.includes('react-native-worklets')) {
    resolverOptions = {
      ...resolverOptions,
      extensions: resolverOptions.extensions?.filter((ext) => !ext.includes('native')),
    };
  }

  return options.defaultResolver(request, resolverOptions);
};

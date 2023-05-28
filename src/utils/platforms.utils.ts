import * as Application from 'expo-application';
import { Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isMobilePlatform = isIOS || isAndroid;

// @ts-ignore
export const applicationName: string = isMobilePlatform ? Application.applicationName : process.env.APP_MANIFEST.name;
export const applicationVersion: string = isMobilePlatform
  ? Application.nativeApplicationVersion
  : // @ts-ignore
    process.env.APP_MANIFEST.version;

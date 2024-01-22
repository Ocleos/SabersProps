import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';
export const isMobilePlatform = isIOS || isAndroid;

export const applicationName: string | undefined = Constants?.expoConfig?.name;
export const applicationVersion: string | undefined = Constants?.expoConfig?.version;

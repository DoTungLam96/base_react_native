import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageKeys from 'src/constants/storage';
import {LoginInfo} from 'src/models/login';
import {ThemeName} from 'src/theme/IThemeProps';

// language
export async function setLanguage(language: string): Promise<void> {
  return AsyncStorage.setItem(StorageKeys.language, language);
}
export async function getLanguage(): Promise<string | null> {
  return AsyncStorage.getItem(StorageKeys.language);
}

// theme
export async function getTheme(): Promise<ThemeName | null> {
  return AsyncStorage.getItem(StorageKeys.theme) as Promise<ThemeName | null>;
}
export async function setTheme(theme: ThemeName): Promise<void> {
  return AsyncStorage.setItem(StorageKeys.theme, theme);
}

// login info
export async function getLoginInfo(): Promise<LoginInfo | null> {
  const userInfo = await AsyncStorage.getItem(StorageKeys.userInfo);
  return userInfo ? JSON.parse(userInfo) : null;
}
export async function setLoginInfo(userInfo: LoginInfo): Promise<void> {
  return AsyncStorage.setItem(StorageKeys.userInfo, JSON.stringify(userInfo));
}
export async function clearLoginInfo(): Promise<void> {
  return AsyncStorage.removeItem(StorageKeys.userInfo);
}

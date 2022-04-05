/* eslint-disable @typescript-eslint/no-unused-vars */
import {Appearance, DevSettings} from 'react-native';
import * as Persist from 'src/utils/persist';
import Themes from './configs';
import defaultTheme from './configs/defaultTheme';
import {IThemeProps, ThemeName, ThemeType} from './IThemeProps';

let theme: IThemeProps = defaultTheme;

const changeTheme = (themeName: ThemeName): void => {
  if (themeName === ThemeType.System) {
    // if theme option is system, then get theme settings from device
    theme = {
      ...Themes.default,
      ...Themes[(Appearance.getColorScheme() as ThemeType) || ThemeType.Light],
    };
    Persist.setTheme(
      (Appearance.getColorScheme() as ThemeType) || ThemeType.Light,
    );
  } else {
    theme = {...Themes.default, ...Themes[themeName || ThemeType.Light]};
    Persist.setTheme(themeName || ThemeType.Light);
  }
  // reset the whole app afterward
  DevSettings.reload('change_theme');
};

const initialLoadTheme = (): void => {
  Persist.getTheme().then(t => (theme = Themes[t || ThemeType.Light]));
};

export default theme;
export {changeTheme, initialLoadTheme};
export const themeSizes = theme.sizes;
export const themeFonts = theme.fonts;
export const themeColors = theme.colors;

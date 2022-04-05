// import darkTheme from './darkTheme';
import {IThemeProps} from '../IThemeProps';
import defaultTheme from './defaultTheme';
// import lightTheme from './lightTheme';

interface ITheme {
  // light: IThemeProps;
  // dark: IThemeProps;
  default: IThemeProps;
}

const Themes: ITheme = {
  // light: lightTheme,
  // dark: darkTheme,
  default: defaultTheme,
};

export default Themes;

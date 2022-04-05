export type Fonts = {
  black: string;
  heavy: string;
  bold: string;
  semiBold: string;
  medium: string;
  regular: string;
  light: string;
  thin: string;
  ultraLight: string;
};

export type Colors = {
  text: string;
  disabledText: string;
  success: string;
  placeholder: string;
  secondary: string;
  primary: string;
  disabledButton: string;
  border: string;
};

export type Sizes = {
  exaLargeText: number;
  megaLargeText: number;
  xxxLargeText: number;
  xxLargeText: number;
  xLargeText: number;
  largeText: number;
  mediumText: number;
  normalText: number;
  smallText: number;
  tinyText: number;
};

export type Dimens = {
  pad1: number;
  pad2: number;
  pad3: number;
  pad4: number;
  pad5: number;
  pad6: number;
  pad7: number;
  pad8: number;
  pad9: number;
  pad10: number;
  mar1: number;
  mar2: number;
  mar3: number;
  mar4: number;
  mar5: number;
  mar6: number;
  mar7: number;
  mar8: number;
  mar9: number;
  mar10: number;
};

export interface IThemeProps {
  fonts: Fonts;
  colors: Colors;
  sizes: Sizes;
}

export enum ThemeType {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export type ThemeName = ThemeType.Light | ThemeType.Dark | ThemeType.System;

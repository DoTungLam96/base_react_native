import {IThemeProps} from '../IThemeProps';
import fonts from 'src/constants/fonts';
import colors from 'src/constants/colors';

const defaultTheme: IThemeProps = {
  sizes: {
    exaLargeText: 32,
    megaLargeText: 26,
    xxxLargeText: 24,
    xxLargeText: 22,
    xLargeText: 20,
    largeText: 18,
    mediumText: 16,
    normalText: 14,
    smallText: 12,
    tinyText: 10,
  },
  fonts: {
    black: fonts.black,
    heavy: fonts.heavy,
    bold: fonts.bold,
    semiBold: fonts.semiBold,
    medium: fonts.medium,
    regular: fonts.regular,
    light: fonts.light,
    thin: fonts.thin,
    ultraLight: fonts.ultraLight,
  },
  colors: {
    text: colors.color_0A0A12,
    disabledText: colors.color_929295,
    success: colors.color_00A357,
    placeholder: colors.color_C8C8CA,
    secondary: colors.color_4353FA,
    primary: colors.color_EE0033,
    disabledButton: colors.color_E3E3E4,
    border: colors.color_E3E3E4,
  },
};

export default defaultTheme;

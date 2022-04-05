import React from 'react';
import {Text} from 'react-native';
import {ColorValue, TextProps, TextStyle} from 'react-native';
import {themeFonts, themeSizes} from 'src/theme/theme';
import {convertPaddingMarginProp} from './utils';

interface Props extends TextProps {
  fontSize?: number;
  fontFamily?: string;
  color?: ColorValue;
  padding?: string | number | number[];
  margin?: string | number | number[];
}

const BaseText = ({
  fontSize,
  fontFamily,
  color,
  padding = '',
  margin = '',
  style,
  ...props
}: Props): React.ReactElement => {
  const computedStyle = React.useMemo((): TextStyle => {
    const generatedStyle: TextStyle = convertPaddingMarginProp(padding, margin);
    if (fontSize) {
      generatedStyle.fontSize = fontSize;
    }
    if (fontFamily) {
      generatedStyle.fontFamily = fontFamily;
    }
    if (color) {
      generatedStyle.color = color;
    }

    return generatedStyle;
  }, [color, fontFamily, fontSize, margin, padding]);

  return <Text style={[computedStyle, style]} {...props} />;
};

export default BaseText;

// tiny
export const TinyBlackText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.tinyText}
    fontFamily={themeFonts.black}
    {...props}
  />
);
export const TinyHeavyText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.tinyText}
    fontFamily={themeFonts.heavy}
    {...props}
  />
);
export const TinyBoldText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.tinyText}
    fontFamily={themeFonts.bold}
    {...props}
  />
);
export const TinySemiBoldText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.tinyText}
    fontFamily={themeFonts.semiBold}
    {...props}
  />
);
export const TinyMediumText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.tinyText}
    fontFamily={themeFonts.medium}
    {...props}
  />
);
export const TinyRegularText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.tinyText}
    fontFamily={themeFonts.regular}
    {...props}
  />
);
export const TinyLightText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.tinyText}
    fontFamily={themeFonts.light}
    {...props}
  />
);
export const TinyThinText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.tinyText}
    fontFamily={themeFonts.thin}
    {...props}
  />
);
export const TinyUltraLightText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.tinyText}
    fontFamily={themeFonts.ultraLight}
    {...props}
  />
);

// small
export const SmallBlackText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.smallText}
    fontFamily={themeFonts.black}
    {...props}
  />
);
export const SmallHeavyText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.smallText}
    fontFamily={themeFonts.heavy}
    {...props}
  />
);
export const SmallBoldText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.smallText}
    fontFamily={themeFonts.bold}
    {...props}
  />
);
export const SmallSemiBoldText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.smallText}
    fontFamily={themeFonts.semiBold}
    {...props}
  />
);
export const SmallMediumText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.smallText}
    fontFamily={themeFonts.medium}
    {...props}
  />
);
export const SmallRegularText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.smallText}
    fontFamily={themeFonts.regular}
    {...props}
  />
);
export const SmallLightText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.smallText}
    fontFamily={themeFonts.light}
    {...props}
  />
);
export const SmallThinText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.smallText}
    fontFamily={themeFonts.thin}
    {...props}
  />
);
export const SmallUltraLightText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.smallText}
    fontFamily={themeFonts.ultraLight}
    {...props}
  />
);

// normal
export const NormalBlackText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.normalText}
    fontFamily={themeFonts.black}
    {...props}
  />
);
export const NormalHeavyText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.normalText}
    fontFamily={themeFonts.heavy}
    {...props}
  />
);
export const NormalBoldText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.normalText}
    fontFamily={themeFonts.bold}
    {...props}
  />
);
export const NormalSemiBoldText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.normalText}
    fontFamily={themeFonts.semiBold}
    {...props}
  />
);
export const NormalMediumText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.normalText}
    fontFamily={themeFonts.medium}
    {...props}
  />
);
export const NormalRegularText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.normalText}
    fontFamily={themeFonts.regular}
    {...props}
  />
);
export const NormalLightText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.normalText}
    fontFamily={themeFonts.light}
    {...props}
  />
);
export const NormalThinText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.normalText}
    fontFamily={themeFonts.thin}
    {...props}
  />
);
export const NormalUltraLightText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.normalText}
    fontFamily={themeFonts.ultraLight}
    {...props}
  />
);

// medium
export const MediumBlackText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.mediumText}
    fontFamily={themeFonts.black}
    {...props}
  />
);
export const MediumHeavyText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.mediumText}
    fontFamily={themeFonts.heavy}
    {...props}
  />
);
export const MediumBoldText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.mediumText}
    fontFamily={themeFonts.bold}
    {...props}
  />
);
export const MediumSemiBoldText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.mediumText}
    fontFamily={themeFonts.semiBold}
    {...props}
  />
);
export const MediumMediumText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.mediumText}
    fontFamily={themeFonts.medium}
    {...props}
  />
);
export const MediumRegularText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.mediumText}
    fontFamily={themeFonts.regular}
    {...props}
  />
);
export const MediumLightText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.mediumText}
    fontFamily={themeFonts.light}
    {...props}
  />
);
export const MediumThinText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.mediumText}
    fontFamily={themeFonts.thin}
    {...props}
  />
);
export const MediumUltraLightText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.mediumText}
    fontFamily={themeFonts.ultraLight}
    {...props}
  />
);

// large
export const LargeBlackText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.largeText}
    fontFamily={themeFonts.black}
    {...props}
  />
);
export const LargeHeavyText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.largeText}
    fontFamily={themeFonts.heavy}
    {...props}
  />
);
export const LargeBoldText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.largeText}
    fontFamily={themeFonts.bold}
    {...props}
  />
);
export const LargeSemiBoldText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.largeText}
    fontFamily={themeFonts.semiBold}
    {...props}
  />
);
export const LargeMediumText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.largeText}
    fontFamily={themeFonts.medium}
    {...props}
  />
);
export const LargeRegularText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.largeText}
    fontFamily={themeFonts.regular}
    {...props}
  />
);
export const LargeLightText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.largeText}
    fontFamily={themeFonts.light}
    {...props}
  />
);
export const LargeThinText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.largeText}
    fontFamily={themeFonts.thin}
    {...props}
  />
);
export const LargeUltraLightText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.largeText}
    fontFamily={themeFonts.ultraLight}
    {...props}
  />
);

// xLarge
export const XLargeBlackText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xLargeText}
    fontFamily={themeFonts.black}
    {...props}
  />
);
export const XLargeHeavyText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xLargeText}
    fontFamily={themeFonts.heavy}
    {...props}
  />
);
export const XLargeBoldText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xLargeText}
    fontFamily={themeFonts.bold}
    {...props}
  />
);
export const XLargeSemiBoldText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xLargeText}
    fontFamily={themeFonts.semiBold}
    {...props}
  />
);
export const XLargeMediumText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xLargeText}
    fontFamily={themeFonts.medium}
    {...props}
  />
);
export const XLargeRegularText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xLargeText}
    fontFamily={themeFonts.regular}
    {...props}
  />
);
export const XLargeLightText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xLargeText}
    fontFamily={themeFonts.light}
    {...props}
  />
);
export const XLargeThinText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xLargeText}
    fontFamily={themeFonts.thin}
    {...props}
  />
);
export const XLargeUltraLightText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xLargeText}
    fontFamily={themeFonts.ultraLight}
    {...props}
  />
);

// xxLarge
export const XxLargeBlackText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xxLargeText}
    fontFamily={themeFonts.black}
    {...props}
  />
);
export const XxLargeHeavyText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xxLargeText}
    fontFamily={themeFonts.heavy}
    {...props}
  />
);
export const XxLargeBoldText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xxLargeText}
    fontFamily={themeFonts.bold}
    {...props}
  />
);
export const XxLargeSemiBoldText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xxLargeText}
    fontFamily={themeFonts.semiBold}
    {...props}
  />
);
export const XxLargeMediumText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xxLargeText}
    fontFamily={themeFonts.medium}
    {...props}
  />
);
export const XxLargeRegularText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xxLargeText}
    fontFamily={themeFonts.regular}
    {...props}
  />
);
export const XxLargeLightText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xxLargeText}
    fontFamily={themeFonts.light}
    {...props}
  />
);
export const XxLargeThinText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xxLargeText}
    fontFamily={themeFonts.thin}
    {...props}
  />
);
export const XxLargeUltraLightText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xxLargeText}
    fontFamily={themeFonts.ultraLight}
    {...props}
  />
);

// xxxLarge
export const XxxLargeBlackText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xxxLargeText}
    fontFamily={themeFonts.black}
    {...props}
  />
);
export const XxxLargeHeavyText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xxxLargeText}
    fontFamily={themeFonts.heavy}
    {...props}
  />
);
export const XxxLargeBoldText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xxxLargeText}
    fontFamily={themeFonts.bold}
    {...props}
  />
);
export const XxxLargeSemiBoldText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xxxLargeText}
    fontFamily={themeFonts.semiBold}
    {...props}
  />
);
export const XxxLargeMediumText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xxxLargeText}
    fontFamily={themeFonts.medium}
    {...props}
  />
);
export const XxxLargeRegularText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xxxLargeText}
    fontFamily={themeFonts.regular}
    {...props}
  />
);
export const XxxLargeLightText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xxxLargeText}
    fontFamily={themeFonts.light}
    {...props}
  />
);
export const XxxLargeThinText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xxxLargeText}
    fontFamily={themeFonts.thin}
    {...props}
  />
);
export const XxxLargeUltraLightText = (props: Props): React.ReactElement => (
  <BaseText
    fontSize={themeSizes.xxxLargeText}
    fontFamily={themeFonts.ultraLight}
    {...props}
  />
);

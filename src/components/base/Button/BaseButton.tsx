import Color from 'color';
import React, {useState} from 'react';
import {useCallback} from 'react';
import {useMemo} from 'react';
import {
  ColorValue,
  GestureResponderEvent,
  ImageStyle,
  Platform,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Color as SvgColor, SvgProps} from 'react-native-svg';
import {elevations} from 'src/common/styles/elevation';
// import {customElevation} from 'src/common/styles/elevation';
import RippleFeedbackIOS from './RippleFeedbackIOS';
import {Range} from '../utils';

const DEFAULT_RIPPLE_LIGHT_COLOR = 'rgba(255, 255, 255, 0.87)';
const DEFAULT_RIPPLE_DARK_COLOR = '#767676';
const DEFAULT_TEXT_COLOR = 'rgba(0, 0, 0, 0.87)';
const DEFAULT_HIGHLIGHT_COLOR = 'rgba(255, 255, 255, 0.1)';
const DEFAULT_ACTIVE_OPACITY = 0.2;
const DEFAULT_COLOR = '#f5f5f5';
const PRESSED_IN_ELEVATION = 8;
const PRESSED_OUT_ELEVATION = 3;
const DEFAULT_RADIUS = 4;
const DEFAULT_FAB_ELEVATION = 6;
const DEFAULT_FAB_RAISED_ELEVATION = 12;
const getFabSize = ({xSmall, small, large, xLarge}): number => {
  if (xSmall) {
    return 32;
  } else if (small) {
    return 40;
  } else if (large) {
    return 64;
  } else if (xLarge) {
    return 72;
  }
  return 56;
};
const getIconSize = ({xSmall, small, large, xLarge}): number => {
  if (xSmall) {
    return 12;
  } else if (small) {
    return 18;
  } else if (large) {
    return 22;
  } else if (xLarge) {
    return 26;
  }
  return 18;
};
const getIconContainerSize = ({xSmall, small, large, xLarge}): number => {
  if (xSmall) {
    return 20;
  } else if (small) {
    return 24;
  } else if (large) {
    return 44;
  } else if (xLarge) {
    return 52;
  }
  return 36;
};
const getButtonHeight = ({xSmall, small, large, xLarge}): number => {
  if (xSmall) {
    return 20;
  } else if (small) {
    return 28;
  } else if (large) {
    return 44;
  } else if (xLarge) {
    return 52;
  }
  return 36;
};
interface Props {
  behavior?: 'ripple' | 'highlight' | 'opacity';
  color?: ColorValue;
  // active color
  activeOpacity?: number;
  underlayColor?: ColorValue; // work on highlight only
  rippleColor?: ColorValue; // work on ripple only
  // outline prop
  raised?: boolean;
  block?: boolean;
  depressed?: boolean;
  fab?: boolean;
  icon?: boolean;
  outlined?: boolean;
  rounded?: boolean;
  text?: boolean;
  tile?: boolean;
  // raised?: boolean;
  // sizing
  xSmall?: boolean;
  small?: boolean;
  normal?: boolean;
  large?: boolean;
  xLarge?: boolean;
  // miscellaneous
  elevation?: -1 | Range<0, 11>;
  disabled?: boolean;
  // content
  title?: string;
  titleSize?: 'tiny' | 'small' | 'normal' | 'large';
  TitleComponent?: React.ReactElement;
  IconComponent?: React.ReactElement;
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
  contentGap?: number;
  style?: ViewStyle;
  // action
  onPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
}

const BaseButton = React.memo(
  ({
    behavior = 'ripple',
    color,
    // active color
    activeOpacity,
    underlayColor,
    rippleColor,
    // outline prop
    raised = true,
    block = false,
    depressed = false,
    fab = false,
    icon = false,
    outlined = false,
    rounded = false,
    text = false,
    tile = false,
    // sizing
    xSmall = false,
    small = false,
    large = false,
    xLarge = false,
    // miscellaneous
    elevation = -1,
    disabled = false,
    // content
    title = '',
    titleSize,
    TitleComponent,
    IconComponent,
    iconPosition = 'left',
    contentGap = 8,
    style,
    // action
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
  }: Props) => {
    const buttonStyle = useMemo<ViewStyle>(() => {
      const generatedStyle: StyleProp<ViewStyle> = {};
      generatedStyle.borderRadius = DEFAULT_RADIUS;
      generatedStyle.overflow = 'hidden';
      generatedStyle.backgroundColor = color || DEFAULT_COLOR;
      generatedStyle.borderWidth = 1;
      generatedStyle.borderLeftWidth = 1;
      generatedStyle.borderRightWidth = 1;
      generatedStyle.borderTopWidth = 1;
      generatedStyle.borderBottomWidth = 1;
      generatedStyle.borderStartWidth = 1;
      generatedStyle.borderEndWidth = 1;
      generatedStyle.borderColor = color || DEFAULT_COLOR;
      generatedStyle.justifyContent = 'center';
      generatedStyle.alignItems = 'center';
      if (elevation === -1) {
        Object.assign(generatedStyle, elevations[PRESSED_OUT_ELEVATION]);
      } else {
        Object.assign(generatedStyle, elevations[elevation]);
      }
      if (block) {
        generatedStyle.width = '100%';
      }
      if (fab) {
        // disable flex, flexGrow, width
        if (style) {
          delete style.flex;
          delete style.flexGrow;
          delete style.width;
          delete style.height;
        }
        generatedStyle.borderColor = 'transparent';

        const size = getFabSize({xSmall, small, large, xLarge});
        generatedStyle.width = generatedStyle.height = size;
        generatedStyle.borderRadius = Math.round(size / 2);
        Object.assign(generatedStyle, elevations[DEFAULT_FAB_ELEVATION]);
      }
      if (depressed) {
        generatedStyle.borderColor = color;
        generatedStyle.backgroundColor = color;
        Object.assign(generatedStyle, elevations[0]);
      }
      if (icon) {
        const size = getIconContainerSize({
          xSmall,
          small,
          large,
          xLarge,
        });
        generatedStyle.width = generatedStyle.height = size;
        generatedStyle.borderRadius = Math.round(size / 2);
        generatedStyle.backgroundColor = 'transparent';
        generatedStyle.borderColor = 'transparent';
        Object.assign(generatedStyle, elevations[0]);
      }
      if (outlined || text) {
        generatedStyle.borderColor = text
          ? 'transparent'
          : color || DEFAULT_TEXT_COLOR;
        generatedStyle.backgroundColor = 'transparent';
        Object.assign(generatedStyle, elevations[0]);
      }
      if (style && style.height) {
        let height;
        if (
          typeof style.height === 'string' &&
          !isNaN(parseInt(style.height, 10))
        ) {
          height = parseInt(style.height, 10);
        } else {
          height = style.height;
        }
        generatedStyle.height = height;
      } else if (!generatedStyle.height) {
        generatedStyle.height = getButtonHeight({xSmall, small, large, xLarge});
      }
      if (rounded && !fab && !icon) {
        const height = generatedStyle.height as number;
        generatedStyle.borderRadius = Math.round(height / 2);
      }
      if (tile) {
        generatedStyle.borderRadius = 0;
      }
      return generatedStyle;
    }, [
      block,
      color,
      depressed,
      elevation,
      fab,
      icon,
      large,
      outlined,
      rounded,
      small,
      style,
      text,
      tile,
      xLarge,
      xSmall,
    ]);

    const textStyle = useMemo<ViewStyle>(() => {
      const generatedStyle: TextStyle = {};
      if (titleSize) {
        if (titleSize === 'tiny') {
          generatedStyle.fontSize = 10;
        } else if (titleSize === 'small') {
          generatedStyle.fontSize = 12;
        } else if (titleSize === 'normal') {
          generatedStyle.fontSize = 14;
        } else if (titleSize === 'large') {
          generatedStyle.fontSize = 16;
        }
      } else {
        if (xSmall) {
          generatedStyle.fontSize = 10;
        } else if (small) {
          generatedStyle.fontSize = 12;
        } else if (large) {
          generatedStyle.fontSize = 14;
        } else if (xLarge) {
          generatedStyle.fontSize = 16;
        } else {
          generatedStyle.fontSize = 14;
        }
      }

      if (outlined || text) {
        generatedStyle.color = color;
      } else {
        generatedStyle.color = color ? '#ffffff' : DEFAULT_TEXT_COLOR;
      }

      return generatedStyle;
    }, [color, large, outlined, small, text, titleSize, xLarge, xSmall]);

    const contentStyle = useMemo<ViewStyle>(() => {
      const generatedStyle: ViewStyle = {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        alignSelf: 'stretch',
      };
      if (!fab && !icon) {
        generatedStyle.minWidth = 36;
        generatedStyle.paddingLeft = 16;
        generatedStyle.paddingRight = 16;
      }
      if (IconComponent) {
        if (iconPosition === 'left') {
          generatedStyle.flexDirection = 'row';
        } else if (iconPosition === 'right') {
          generatedStyle.flexDirection = 'row-reverse';
        } else if (iconPosition === 'top') {
          generatedStyle.flexDirection = 'column-reverse';
        } else if (iconPosition === 'bottom') {
          generatedStyle.flexDirection = 'column';
        }
      }
      return generatedStyle;
    }, [IconComponent, fab, icon, iconPosition]);
    const gapStyle = useMemo<ViewStyle>(() => {
      const generatedStyle: ViewStyle = {};
      if (IconComponent) {
        if (iconPosition === 'left') {
          generatedStyle.marginRight = contentGap;
        } else if (iconPosition === 'right') {
          generatedStyle.marginLeft = contentGap;
        } else if (iconPosition === 'top') {
          generatedStyle.marginBottom = contentGap;
        } else if (iconPosition === 'bottom') {
          generatedStyle.marginTop = contentGap;
        }
      }
      return generatedStyle;
    }, [IconComponent, contentGap, iconPosition]);
    const iconProp = useMemo<{style?: ImageStyle} & SvgProps>(() => {
      const props: {style?: ImageStyle} & SvgProps = {};
      if (IconComponent) {
        const generatedStyle: ImageStyle = {};
        let size = 18;
        if (icon || fab) {
          size = getIconSize({xSmall, small, large, xLarge});
        }
        generatedStyle.width = size;
        generatedStyle.height = size;
        props.width = size;
        props.height = size;
        generatedStyle.zIndex = 2;
        if (icon || outlined) {
          generatedStyle.tintColor = color || DEFAULT_TEXT_COLOR;
          props.color = (color || DEFAULT_TEXT_COLOR) as SvgColor;
        } else {
          generatedStyle.tintColor = color ? '#ffffff' : DEFAULT_TEXT_COLOR;
          props.color = color ? '#ffffff' : DEFAULT_TEXT_COLOR;
        }
        props.style = generatedStyle;
      }
      return props;
    }, [
      IconComponent,
      color,
      fab,
      icon,
      large,
      outlined,
      small,
      xLarge,
      xSmall,
    ]);

    const renderContent = useCallback((): React.ReactElement => {
      let _Title: React.ReactElement;
      if (TitleComponent) {
        _Title = TitleComponent;
      } else {
        _Title = <Text style={textStyle}>{title}</Text>;
      }
      return (
        <View style={contentStyle}>
          {!text &&
            IconComponent &&
            React.cloneElement(IconComponent, iconProp)}
          {!text && !icon && !fab && IconComponent && <View style={gapStyle} />}
          {!icon &&
            !fab &&
            React.cloneElement(_Title, {
              style: {zIndex: 2, ..._Title.props.style},
            })}
        </View>
      );
    }, [
      IconComponent,
      TitleComponent,
      contentStyle,
      fab,
      gapStyle,
      icon,
      iconProp,
      text,
      textStyle,
      title,
    ]);

    const responsiveRippleColor = useMemo<ColorValue>(() => {
      if (rippleColor) {
        return rippleColor;
      }
      if (color) {
        const c = Color(color);
        if (outlined || text || icon) {
          return (c.luminosity() > 0.5
            ? c.darken(0.5).rgb().toString()
            : c.lighten(0.5).rgb().toString()) as ColorValue;
        } else {
          return DEFAULT_RIPPLE_LIGHT_COLOR;
        }
      } else {
        return DEFAULT_RIPPLE_DARK_COLOR;
      }
    }, [color, icon, outlined, rippleColor, text]);

    const isRaisable = useMemo<boolean>(() => {
      return (
        raised && !depressed && !outlined && !icon && !text && elevation === -1
      );
    }, [depressed, elevation, icon, outlined, raised, text]);
    const [raisableElevation, setRaisableElevation] = useState<number>(
      fab ? DEFAULT_FAB_ELEVATION : PRESSED_OUT_ELEVATION,
    );
    const _onPressIn = useCallback(
      (e: GestureResponderEvent) => {
        if (isRaisable) {
          // Animated.timing(raisableElevation.current, {
          //   toValue: fab ? DEFAULT_FAB_RAISED_ELEVATION : PRESSED_IN_ELEVATION,
          //   useNativeDriver: true,
          //   duration: 150,
          // }).start();
          setRaisableElevation(
            fab ? DEFAULT_FAB_RAISED_ELEVATION : PRESSED_IN_ELEVATION,
          );
        }
        if (onPressIn) {
          onPressIn(e);
        }
      },
      [fab, isRaisable, onPressIn],
    );
    const _onPressOut = useCallback(
      (e: GestureResponderEvent) => {
        if (isRaisable) {
          // Animated.timing(raisableElevation.current, {
          //   toValue: fab ? DEFAULT_FAB_ELEVATION : PRESSED_OUT_ELEVATION,
          //   useNativeDriver: true,
          //   duration: 150,
          // }).start();
          setRaisableElevation(
            fab ? DEFAULT_FAB_ELEVATION : PRESSED_OUT_ELEVATION,
          );
        }
        if (onPressOut) {
          onPressOut(e);
        }
      },
      [fab, isRaisable, onPressOut],
    );

    const renderButton = useCallback((): React.ReactElement => {
      switch (behavior) {
        case 'opacity':
          return (
            <TouchableOpacity
              activeOpacity={activeOpacity || DEFAULT_ACTIVE_OPACITY}
            />
          );
        case 'highlight':
          return (
            <TouchableHighlight
              underlayColor={underlayColor || DEFAULT_HIGHLIGHT_COLOR}
            />
          );
        case 'ripple':
          if (Platform.OS === 'android') {
            return (
              <Pressable
                android_ripple={{
                  color: responsiveRippleColor,
                }}
              />
            );
          } else {
            return <RippleFeedbackIOS color={responsiveRippleColor} />;
          }
      }
    }, [activeOpacity, behavior, responsiveRippleColor, underlayColor]);

    return (
      <>
        {React.cloneElement(renderButton(), {
          onPressIn: _onPressIn,
          onPressOut: _onPressOut,
          onPress: onPress,
          onLongPress: onLongPress,
          disabled: disabled,
          style: [
            buttonStyle,
            style,
            isRaisable && elevations[raisableElevation],
          ],
          children: renderContent(),
        })}
      </>
    );
  },
);

export default BaseButton;

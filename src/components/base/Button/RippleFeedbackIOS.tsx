import React, {useRef, useState} from 'react';
import {useMemo} from 'react';
import {ColorValue, Pressable, ViewStyle} from 'react-native';
import {
  Animated,
  Easing,
  View,
  StyleSheet,
  GestureResponderEvent,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import Color from 'color';

interface Props extends TouchableWithoutFeedbackProps {
  color?: ColorValue;
  disabled?: boolean;
  children?: React.ReactElement;
  onPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
}

const MAX_DIAMETER = 200;

const RippleFeedbackIOS = React.memo(
  ({
    testID = '',
    children,
    onPress,
    onLongPress,
    onPressOut,
    onPressIn,
    color = 'rgba(0, 0, 0, 0.87)',
    disabled = false,
    style = {},
  }: Props) => {
    const maxOpacity = useMemo<number>(
      () => (color && Color(color).isDark() ? 0.12 : 0.3),
      [color],
    );

    const scaleValue = useRef(new Animated.Value(0));
    const opacityRippleValue = useRef(new Animated.Value(maxOpacity));
    const opacityBackgroundValue = useRef(new Animated.Value(0));
    const [diameter, setDiameter] = useState<number>(MAX_DIAMETER);
    const rippleColor = color;
    const longPress = useRef<boolean>(false);
    const [pressX, setPressX] = useState<number>();
    const [pressY, setPressY] = useState<number>();

    const onLayoutChanged = (event) => {
      try {
        // get width and height of wrapper
        const {
          nativeEvent: {
            layout: {width, height},
          },
        } = event;
        const _diameter = Math.ceil(Math.sqrt(width * width + height * height));

        // setDiameter(Math.min(diameter, MAX_DIAMETER));
        setDiameter(_diameter);
      } catch (e) {
        setDiameter(MAX_DIAMETER);
      }
    };

    const _onLongPress = (e: GestureResponderEvent) => {
      longPress.current = true;

      // Animation of long press is slightly different than onPress animation
      // Animated.timing(opacityBackgroundValue.current, {
      //   toValue: maxOpacity / 2,
      //   duration: 700,
      //   useNativeDriver: true,
      // }).start();

      if (onLongPress) {
        onLongPress(e);
      }
    };

    const _onPress = (e: GestureResponderEvent) => {
      Animated.parallel([
        Animated.timing(opacityBackgroundValue.current, {
          toValue: maxOpacity / 2,
          duration: 125 + diameter,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacityRippleValue.current, {
          toValue: 0,
          duration: 125 + diameter,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue.current, {
          toValue: 1,
          duration: 125 + diameter,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.timing(opacityBackgroundValue.current, {
          toValue: 0,
          duration: 225,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }).start();

        setDefaultAnimatedValues();
      });

      if (onPress) {
        onPress(e);
      }
    };

    const _onPressIn = (e: GestureResponderEvent) => {
      setPressX(e.nativeEvent.locationX);
      setPressY(e.nativeEvent.locationY);
      Animated.parallel([
        Animated.timing(opacityBackgroundValue.current, {
          toValue: maxOpacity / 2,
          duration: 125 + diameter,
          useNativeDriver: true,
        }),
        Animated.timing(opacityRippleValue.current, {
          toValue: 0,
          duration: 125 + diameter,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue.current, {
          toValue: 1,
          duration: 125 + diameter,
          useNativeDriver: true,
        }),
      ]).start(setDefaultAnimatedValues);
      if (onPressIn) {
        onPressIn(e);
      }
    };

    const _onPressOut = (e: GestureResponderEvent) => {
      if (longPress.current) {
        longPress.current = false;
      }
      Animated.timing(opacityBackgroundValue.current, {
        toValue: 0,
        duration: 225,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();

      if (onPressOut) {
        onPressOut(e);
      }
    };

    const setDefaultAnimatedValues = () => {
      scaleValue.current.setValue(0);
      opacityRippleValue.current.setValue(maxOpacity);
    };

    const renderRippleView = () => {
      return (
        <Animated.View
          key="ripple-view"
          pointerEvents="none"
          style={[
            styles.abs,
            styles.zIndex_1,
            {
              top: (pressY || 0) - diameter / 2,
              left: (pressX || 0) - diameter / 2,
              width: diameter,
              height: diameter,
              borderRadius: diameter / 2,
              transform: [{scale: scaleValue.current}],
              opacity: opacityRippleValue.current,
              backgroundColor: rippleColor,
            },
          ]}
        />
      );
    };

    const renderOpacityBackground = () => {
      return (
        <Animated.View
          key="ripple-opacity"
          pointerEvents="none"
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              opacity: opacityBackgroundValue.current,
              backgroundColor: rippleColor,
            },
            styles.zIndex_1,
          ]}
        />
      );
    };

    const parent = React.Children.only(children);

    const ripple = (
      <View
        key="ripple-feedback-layer"
        style={[styles.container, style]}
        pointerEvents="none">
        {renderOpacityBackground()}
        {renderRippleView()}
      </View>
    );

    const buttonStyle = useMemo<ViewStyle>(() => {
      const generatedStyle = StyleSheet.flatten(style);
      generatedStyle.borderWidth = 0;
      generatedStyle.borderLeftWidth = 0;
      generatedStyle.borderRightWidth = 0;
      generatedStyle.borderTopWidth = 0;
      generatedStyle.borderBottomWidth = 0;
      generatedStyle.borderStartWidth = 0;
      generatedStyle.borderEndWidth = 0;
      return generatedStyle;
    }, [style]);

    return (
      <Pressable
        testID={testID}
        disabled={disabled}
        style={buttonStyle}
        onLayout={onLayoutChanged}
        onPressIn={_onPressIn}
        onLongPress={_onLongPress}
        onPressOut={_onPressOut}
        onPress={_onPress}>
        {parent &&
          React.cloneElement(parent, [], parent.props.children, ripple)}
      </Pressable>
    );
  },
);

export default RippleFeedbackIOS;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  zIndex_1: {
    zIndex: 1,
  },
  abs: {
    position: 'absolute',
  },
});

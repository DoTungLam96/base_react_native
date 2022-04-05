import * as React from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import color from 'color';
import {RadioButtonContext, RadioButtonContextType} from './RadioButtonGroup';
import {handlePress, isChecked} from './utils';

type Props = TouchableOpacityProps & {
  value: string;
  status?: 'checked' | 'unchecked';
  disabled?: boolean;
  uncheckedColor?: string;
  onPress?: () => void;
  color?: string;
  testID?: string;
  text?: string;
};
const BORDER_WIDTH = 2;

const RadioButtonIOS = ({
  disabled,
  onPress,
  status,
  value,
  testID,
  ...rest
}: Props): React.ReactElement => {
  const {current: borderAnim} = React.useRef<Animated.Value>(
    new Animated.Value(BORDER_WIDTH),
  );

  const {current: radioAnim} = React.useRef<Animated.Value>(
    new Animated.Value(1),
  );
  const checkedColor = rest.color || '#03dac4';
  const uncheckedColor =
    rest.uncheckedColor || color('#000').alpha(0.54).rgb().string();
  let radioColor: string;

  return (
    <RadioButtonContext.Consumer>
      {(context?: RadioButtonContextType) => {
        const checked =
          isChecked({
            contextValue: context?.value,
            status,
            value,
          }) === 'checked';
        if (disabled) {
          radioColor = color('#000').alpha(0.26).rgb().string();
        } else {
          radioColor = checked ? checkedColor : uncheckedColor;
        }

        return (
          <TouchableOpacity
            {...rest}
            onPress={
              disabled
                ? undefined
                : () => {
                    handlePress({
                      onPress,
                      value,
                      onValueChange: context?.onValueChange,
                    });
                  }
            }
            accessibilityRole="radio"
            accessibilityState={{disabled, checked}}
            accessibilityLiveRegion="polite"
            style={styles.container}
            testID={testID}>
            <Animated.View
              style={[
                styles.radio,
                {
                  borderColor: radioColor,
                  borderWidth: borderAnim,
                },
              ]}>
              {checked ? (
                <View style={[StyleSheet.absoluteFill, styles.radioContainer]}>
                  <Animated.View
                    style={[
                      styles.dot,
                      {
                        backgroundColor: radioColor,
                        transform: [{scale: radioAnim}],
                      },
                    ]}
                  />
                </View>
              ) : null}
            </Animated.View>
          </TouchableOpacity>
        );
      }}
    </RadioButtonContext.Consumer>
  );
};

RadioButtonIOS.displayName = 'RadioButton.IOS';

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 6,
  },
  radioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    margin: 8,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
});

export default RadioButtonIOS;

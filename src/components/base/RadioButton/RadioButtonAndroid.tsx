import * as React from 'react';
import {
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from 'react-native';
import color from 'color';
import {RadioButtonContext, RadioButtonContextType} from './RadioButtonGroup';
import {handlePress} from './utils';

type Props = TouchableOpacityProps & {
  value?: string;
  status?: 'checked' | 'unchecked';
  disabled?: boolean;
  onPress?: (param?: unknown) => void;
  uncheckedColor?: string;
  color?: string;
  testID?: string;
  text?: string;
};

const BORDER_WIDTH = 2;

const RadioButtonAndroid = ({
  disabled,
  onPress,
  value = '',
  status,
  testID,
  text,
  ...rest
}: Props): React.ReactElement => {
  const {current: borderAnim} = React.useRef<Animated.Value>(
    new Animated.Value(BORDER_WIDTH),
  );

  const {current: radioAnim} = React.useRef<Animated.Value>(
    new Animated.Value(1),
  );

  const isFirstRendering = React.useRef<boolean>(true);

  React.useEffect(() => {
    // Do not run animation on very first rendering
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      return;
    }

    if (status === 'checked') {
      radioAnim.setValue(1.2);

      Animated.timing(radioAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    } else {
      borderAnim.setValue(10);

      Animated.timing(borderAnim, {
        toValue: BORDER_WIDTH,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  }, [status, borderAnim, radioAnim]);

  const checkedColor = rest.color || '#03dac4';
  const uncheckedColor =
    rest.uncheckedColor || color('#000').alpha(0.54).rgb().string();

  let radioColor: string;

  return (
    <RadioButtonContext.Consumer>
      {(context?: RadioButtonContextType) => {
        const checked = status === 'checked';

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
                      onValueChange: context?.onValueChange,
                      value,
                    });
                  }
            }
            style={styles.container}
            testID={testID}>
            <View style={styles.contentContainer}>
              <Animated.View
                style={[
                  styles.radio,
                  {
                    borderColor: radioColor,
                    borderWidth: borderAnim,
                  },
                ]}>
                {checked ? (
                  <View
                    style={[StyleSheet.absoluteFill, styles.radioContainer]}>
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
              <Text style={styles.text}>{text || ''}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    </RadioButtonContext.Consumer>
  );
};

RadioButtonAndroid.displayName = 'RadioButton.Android';

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
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
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
  },
});

export default RadioButtonAndroid;

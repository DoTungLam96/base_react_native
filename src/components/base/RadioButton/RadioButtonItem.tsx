import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {RadioButtonContext, RadioButtonContextType} from './RadioButtonGroup';
import {handlePress} from './utils';
import RadioButton from './BaseRadioButton';
import RadioButtonAndroid from './RadioButtonAndroid';
import RadioButtonIOS from './RadioButtonIOS';

export type Props = {
  value: string;
  label: string;
  disabled?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  uncheckedColor?: string;
  color?: string;
  status?: 'checked' | 'unchecked';
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  testID?: string;
  mode?: 'android' | 'ios';
  position?: 'leading' | 'trailing';
};

const RadioButtonItem = ({
  value,
  label,
  style,
  labelStyle,
  onPress,
  disabled,
  color,
  uncheckedColor,
  status,
  accessibilityLabel,
  testID,
  mode,
  position = 'trailing',
}: Props): React.ReactElement => {
  const radioButtonProps = {value, disabled, status, color, uncheckedColor};
  const isLeading = position === 'leading';
  let radioButton: unknown;

  if (mode === 'android') {
    radioButton = <RadioButtonAndroid {...radioButtonProps} />;
  } else if (mode === 'ios') {
    radioButton = <RadioButtonIOS {...radioButtonProps} />;
  } else {
    radioButton = <RadioButton {...radioButtonProps} />;
  }

  return (
    <RadioButtonContext.Consumer>
      {(context?: RadioButtonContextType) => {
        return (
          <TouchableOpacity
            onPress={
              disabled
                ? undefined
                : () =>
                    handlePress({
                      onPress: onPress,
                      onValueChange: context?.onValueChange,
                      value,
                    })
            }
            accessibilityLabel={accessibilityLabel}
            testID={testID}>
            <View style={[styles.container, style]} pointerEvents="none">
              {isLeading && radioButton}
              <Text
                style={[
                  styles.label,
                  isLeading ? styles.textAlignRight : styles.textAlignLeft,
                  labelStyle,
                ]}>
                {label}
              </Text>
              {!isLeading && radioButton}
            </View>
          </TouchableOpacity>
        );
      }}
    </RadioButtonContext.Consumer>
  );
};

RadioButtonItem.displayName = 'RadioButton.Item';

export default RadioButtonItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    flexShrink: 1,
    flexGrow: 1,
    color: '#000',
  },
  textAlignLeft: {
    textAlign: 'left',
  },
  textAlignRight: {
    textAlign: 'right',
  },
});

import * as React from 'react';
import RadioButtonAndroid from './RadioButtonAndroid';

export type Props = {
  value?: string;
  status?: 'checked' | 'unchecked';
  disabled?: boolean;
  onPress?: () => void;
  uncheckedColor?: string;
  color?: string;
  testID?: string;
  text?: string;
};

const RadioButton = (props: Props): React.ReactElement => {
  // const Button = Platform.select({
  //   default: RadioButtonAndroid,
  //   ios: RadioButtonIOS,
  // });

  return <RadioButtonAndroid {...props} />;
};

export default RadioButton;

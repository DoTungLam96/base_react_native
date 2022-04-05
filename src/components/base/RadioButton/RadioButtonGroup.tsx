import * as React from 'react';
import {View} from 'react-native';

type Props = {
  onValueChange: (value: string) => void;
  value: string;
  children: React.ReactNode;
};

export type RadioButtonContextType = {
  value: string;
  onValueChange: ((value: string) => void) | null;
};

export const RadioButtonContext = React.createContext<RadioButtonContextType>({
  value: '',
  onValueChange: null,
});
const RadioButtonGroup = ({
  value,
  onValueChange,
  children,
}: Props): React.ReactElement => (
  <RadioButtonContext.Provider value={{value, onValueChange}}>
    <View accessible accessibilityRole="radiogroup">
      {children}
    </View>
  </RadioButtonContext.Provider>
);

RadioButtonGroup.displayName = 'RadioButton.Group';
export default RadioButtonGroup;

// @component-docs ignore-next-line
export {RadioButtonGroup};

import React from 'react';

import Picker from '@gregfrench/react-native-wheel-picker';
import {View} from 'react-native';
const PickerItem = Picker.Item;

const CustomWheelPicker = ({
  initSelectedIndex = 0,
  listItem,
  valueKeyExtractor,
  onValueChange,
}: {
  initSelectedIndex?: number;
  visible?: boolean;
  listItem: Record<string, unknown>[];
  valueKeyExtractor: string;
  onValueChange?: (value: Record<string, unknown>) => void;
}): React.ReactElement => {
  return (
    <View>
      <Picker
        style={{width: 150, height: 190}}
        lineColor="#000000" //to set top and bottom line color (Without gradients)
        lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
        lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
        selectedValue={initSelectedIndex}
        itemStyle={{color: 'black'}}
        onValueChange={(index) =>
          onValueChange && onValueChange(listItem[index])
        }>
        {listItem.map((value, i) => (
          <PickerItem
            label={value[valueKeyExtractor] as string}
            value={i}
            key={i}
          />
        ))}
      </Picker>
    </View>
  );
};

export default CustomWheelPicker;

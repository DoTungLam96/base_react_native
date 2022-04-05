export const handlePress = ({
  onPress,
  value,
  onValueChange,
}: {
  onPress?: () => void;
  value: string;
  onValueChange?: ((value: string) => void) | null;
}): void => {
  if (typeof onValueChange === 'function') {
    onValueChange(value);
  } else {
    onPress?.();
  }
};

export const isChecked = ({
  value,
  status,
  contextValue,
}: {
  value: string;
  status?: 'checked' | 'unchecked';
  contextValue?: string;
}): 'checked' | 'unchecked' => {
  if (contextValue) {
    return contextValue === value ? 'checked' : 'unchecked';
  } else {
    return status || 'unchecked';
  }
};

import {useCallback, useEffect, useState} from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';

export default function useKeyboardState(): {
  keyboardHeight: number;
  keyboardShown: boolean;
} {
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  const onKeyboardShown = useCallback((e: KeyboardEvent) => {
    setKeyboardShown(true);
    setKeyboardHeight(e.endCoordinates.height);
  }, []);
  const onKeyboardHidden = useCallback(() => {
    setKeyboardShown(false);
    setKeyboardHeight(0);
  }, []);

  useEffect(() => {
    const sub1 = Keyboard.addListener('keyboardWillShow', onKeyboardShown);
    const sub2 = Keyboard.addListener('keyboardWillHide', onKeyboardHidden);
    const sub3 = Keyboard.addListener('keyboardDidShow', onKeyboardShown);
    const sub4 = Keyboard.addListener('keyboardDidHide', onKeyboardHidden);

    //errors: attempted to remove more rctkeyboardobserver listeners than added

    return () => {
      Keyboard.removeSubscription(sub1);
      Keyboard.removeSubscription(sub2);
      Keyboard.removeSubscription(sub3);
      Keyboard.removeSubscription(sub4);
      // Keyboard.removeListener('keyboardWillHide', onKeyboardHidden);
      // Keyboard.removeListener('keyboardDidShow', onKeyboardShown);
      // Keyboard.removeListener('keyboardDidHide', onKeyboardHidden);
    };
  }, [onKeyboardHidden, onKeyboardShown]);

  return {keyboardHeight, keyboardShown};
}

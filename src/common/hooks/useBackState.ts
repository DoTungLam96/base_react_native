import {useEffect} from 'react';
import {BackHandler} from 'react-native';

function useBackState(handler: () => void): void {
  useEffect(() => {
    const backAction = () => {
      handler();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useBackState;

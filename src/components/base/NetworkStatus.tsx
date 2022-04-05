import * as React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {themeFonts, themeSizes} from 'src/theme/theme';
import NetInfo from '@react-native-community/netinfo';
import colors from 'src/constants/colors';
import defaultStyles from 'src/common/styles';
import Svgs from 'src/constants/Svgs';
import { globalData } from 'src/utils/common';

const NetworkStatus = (): React.ReactElement => {
  const [connected, setConnected] = React.useState<boolean>(true);
  React.useEffect(() => {
    const onConnected = () => {
      setConnected(true);
      globalData.isConnected = true;
    };
    const onDisconnected = () => {
      setConnected(false);
      globalData.isConnected = false;
    };
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        onConnected();
      } else {
        onDisconnected();
      }
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView
      style={[
        defaultStyles.abs,
        defaultStyles.left,
        defaultStyles.right,
        defaultStyles.bottom,
      ]}>
      <Modal animationType="fade" transparent={true} visible={!connected}>
        <View style={styles.main}>
          <View style={styles.content}>
            <View style={styles.image}>
              <Svgs.ErrorConnect width={112} height={91} />
            </View>
            <Text style={styles.txtLostConnect}>Đã mất kết nối!</Text>
            <Text style={styles.txtCheck}>
              Vui lòng kiểm tra đường truyền Internet
            </Text>

            <TouchableOpacity
              style={styles.btnOk}
              onPress={() => setConnected(true)}>
              <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default NetworkStatus;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    zIndex: 2,
  },
  image: {
    marginTop: 25,
    marginBottom: 30,
  },
  txtLostConnect: {
    color: '#000',
    fontSize: 18,
  },
  txtCheck: {
    fontSize: 14,
    color: '#707070',
    marginTop: 8,
    marginBottom: 16,
  },
  btnOk: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 150,
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: '#4353FA',
    borderRadius: 20,
    zIndex: 10,
  },

  text: {
    fontSize: themeSizes.normalText,
    fontFamily: themeFonts.regular,
    color: colors.white,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
    paddingVertical: 3,
  },
  connected: {
    backgroundColor: colors.color_00A357,
  },
  disconnected: {
    backgroundColor: colors.color_929295,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

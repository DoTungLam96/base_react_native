import React, {useCallback, useRef, useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CodePush from 'react-native-code-push';
import {Checkbox} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import DialogAlertResult from 'src/components/common/DialogAlertResult';
import {navigationRoutes} from 'src/constants/common';
import images from 'src/constants/images';
import navigationService from 'src/navigation/navigationService';
import {sendObject} from 'src/redux/home/action/homeActions';
import LoginAPI from 'src/services/loginApi/loginApi';

const Login = () => {
  const apiLogin = useRef(new LoginAPI());

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = useCallback(() => {
    apiLogin.current
      .login({
        username: username,
        password: password,
      })
      .then(data => {
        if (data?.status.toLowerCase() === 'ok') {
          navigationService.navigate(
            navigationRoutes.BOTTOM_NAVIGATION,
            undefined,
          );
          dispatch(sendObject('', username, password));
        } else {
          DialogAlertResult.showError('Lỗi', `${data?.status}`);
        }
      })
      .catch(err => console.log('err', err));
    // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password, dispatch]);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={images.logo} />

      <StatusBar barStyle={'default'} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#707070"
          onChangeText={email => setUsername(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#707070"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>

      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          CodePush.sync({
            updateDialog: {
              title: 'Nâng cấp ứng dụng ',
              optionalIgnoreButtonLabel: 'Bỏ qua',
              optionalInstallButtonLabel: 'Đồng ý',
              optionalUpdateMessage:
                'Vừa có bản cập nhật mới. Bạn có muốn cập nhật không?',
              mandatoryUpdateMessage:
                'Vừa có bản cập nhật mới. Ấn tiếp tục để cập nhật',
              mandatoryContinueButtonLabel: 'Tiếp tục',
            },
            installMode: CodePush.InstallMode.IMMEDIATE,
          });
          setChecked(!checked);
        }}
      />

      <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin()}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#000',
  },
  image: {
    marginBottom: 40,
    width: '90%',
    height: 100,
  },
  inputView: {
    borderRadius: 30,
    width: '70%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 0.6,
    marginBottom: 20,
    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#059df5',
  },
});

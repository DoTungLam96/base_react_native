/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import NetworkStatus from 'src/components/base/NetworkStatus';
import DrawerNavigation from 'src/navigation/drawerNavigation';
import {ModalPortal} from 'react-native-modals';
import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from 'src/redux/rootReducer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {getLanguage} from 'src/utils/persist';
import {initialLoadTheme} from 'src/theme/theme';
import {DEFAULT_LANGUAGE} from 'src/constants/common';
import useCheckAppVersionUpdate from 'src/common/hooks/useCheckAppVersion';
import CodePush from 'react-native-code-push';
const store = createStore(rootReducer, applyMiddleware(thunk));
const App = () => {
  const {i18n} = useTranslation();
  // useCheckAppVersionUpdate();
  // Initial load system's settings
  useEffect(() => {
    // load language setting
    getLanguage().then(language =>
      i18n.changeLanguage(language || DEFAULT_LANGUAGE),
    );
  }, [i18n]);

  // load theme setting
  useEffect(() => {
    initialLoadTheme();

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
  }, []);

  return (
    <Provider store={store}>
      <DrawerNavigation />
      <NetworkStatus />
      <ModalPortal />
    </Provider>
  );
};
const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.ON_NEXT_RESUME,
};
export default CodePush(codePushOptions)(App);

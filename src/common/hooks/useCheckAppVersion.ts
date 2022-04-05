/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import {useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Linking, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import semver, {SemVer} from 'semver';
import DialogAlert from 'src/components/common/DialogAlertResult';
import {
  LINK_CENTER_APP,
  LINK_STORE_APP,
  X_API_APP_CENTER,
} from 'src/constants/common';

const useCheckAppVersionUpdate = () => {
  const {t} = useTranslation();
  const checkVersion = useCallback(
    (
      appVersion: SemVer | null,
      latestVersion: SemVer | null,
      action: () => void,
    ) => {
      if (appVersion && latestVersion && semver.lt(appVersion, latestVersion)) {
        DialogAlert.showWarning(
          'Thông báo',
          'Đã có bản cập nhật mới',
          [
            {
              text: 'Cài đặt',
              onPress: action,
            },
          ],
          {cancelable: false},
        );
      }
    },
    [],
  );
  useEffect(() => {
    const appVersion = semver.coerce(DeviceInfo.getVersion());
    if (Platform.OS === 'ios') {
      axios
        .get(LINK_CENTER_APP, {
          headers: {
            'X-API-Token': X_API_APP_CENTER,
          },
        })
        .then(versionInfo => {
          if (versionInfo.data.length > 0) {
            const latestVersion = semver.coerce(
              versionInfo.data[0].short_version,
            );

            checkVersion(appVersion, latestVersion, () =>
              Linking.openURL(LINK_STORE_APP),
            );
          }
        });
    } else if (Platform.OS === 'android') {
      axios
        .get(LINK_CENTER_APP, {
          headers: {
            'X-API-Token': X_API_APP_CENTER,
          },
        })
        .then(versionInfo => {
          if (versionInfo.data.length > 0) {
            const latestVersion = semver.coerce(
              versionInfo.data[0].short_version,
            );
            checkVersion(appVersion, latestVersion, () =>
              Linking.openURL(LINK_STORE_APP),
            );
          }
        });
    }
  }, [checkVersion]);
};

export default useCheckAppVersionUpdate;

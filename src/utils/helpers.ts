import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import md5 from 'md5';
import DialogAlertResult from 'src/components/common/DialogAlertResult';
import {SECRET_KEY} from 'src/configs/environment';
import {navigationRoutes} from 'src/constants/common';
import navigationService from 'src/navigation/navigationService';
import HomeApi from 'src/services/api/home/HomeApi';
import {globalData} from './common';
dayjs.extend(duration);

const numberFormatter = new Intl.NumberFormat();
const vndFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export const formatNumber = (price: number): string => {
  return numberFormatter.format(price);
};

export const formatVND = (price: number): string => {
  return vndFormatter.format(price);
};

export const formatDate = (date: Date): string => {
  return dayjs(date).format('YYYY-DD-MM HH:mm:ss.SSS');
};

export const formatDateToString = (
  date: Date,
  formatString: string,
): string => {
  return dayjs(date).format(formatString);
};

export const parseDate = (formattedDate: string): Date => {
  return dayjs(formattedDate, 'YYYY-DD-MM HH:mm:ss.SSS').toDate();
};

export const formatDurationFromSeconds = (seconds: number): string => {
  // eslint-disable-next-line no-bitwise
  const hour = ~~(seconds / (60 * 60));
  // eslint-disable-next-line no-bitwise
  const minute = ~~(seconds / 60);
  return hour > 0 ? `${hour} giờ ${minute} phút` : `${minute} phút`;
};

export const isEmptyObj = (obj = {}): boolean => {
  return Object.keys(obj).length !== 0;
};
export const isEmptyStr = (str: string): boolean => {
  return Boolean(str.trim().length);
};

export const getHash = (
  uuid: number,
  currentTime: number,
  data?: Record<string, unknown>,
): string => {
  const uuidKey = 'uuid';
  const currentTimeKey = 'unix_timestamp';
  let stringToHash = `${uuid}`;
  let keys: string[] = [];
  if (data) {
    keys = Object.keys(data);
  }
  keys.push(uuidKey);
  keys.push(currentTimeKey);
  keys.sort();
  keys.forEach((item) => {
    if (item === uuidKey) {
      stringToHash = stringToHash.concat(`${uuid}`);
    } else if (item === currentTimeKey) {
      stringToHash = stringToHash.concat(`${currentTime}`);
    } else {
      stringToHash = stringToHash.concat(
        typeof (data ? data[item] : '') === 'object'
          ? JSON.stringify(data ? data[item] : '')
          : String(data ? data[item] : ''),
      );
    }
  });
  // console.log('stringToHash', stringToHash);

  stringToHash = stringToHash.concat(SECRET_KEY);

  return md5(stringToHash);
};

export const LogoutIfInvalidSession = async (): Promise<void> => {
  const apiService = new HomeApi();

  const notifications = await apiService.unregisterDevice(
    globalData.firebaseToken,
  );
  if (!globalData.isShowPopupLogout) {
    globalData.isShowPopupLogout = true;
    DialogAlertResult.showError(
      'Thông báo',
      'Tài khoản này đang được đăng nhập từ một thiết bị khác',
      [
        {
          text: 'Đăng xuất',
          onPress: () => {
            apiService.logout(globalData.uuid).then((data) => {
              console.log(`data`, data);
            });
            globalData.isShowPopupLogout = false;
            navigationService.reset(navigationRoutes.LOGIN);
          },
        },
      ],
    );
  }
};

export const AutoGenerateId = (): string => {
  return `${Math.floor(Math.random() * 25061996)}`;
};

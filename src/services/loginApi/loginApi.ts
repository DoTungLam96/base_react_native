/* eslint-disable @typescript-eslint/no-unused-vars */
import {BASE_URL_API} from 'src/configs/environment';
import {LoginBody, LoginRespond} from 'src/models/LoginModel';

import ApiService from '../ApiServices';
import {v1} from './endpoints';

export default class LoginAPI extends ApiService {
  constructor() {
    super(BASE_URL_API);
  }

  login = (body: LoginBody): Promise<LoginRespond | null> => {
    console.log(`body`, body);
    return this.POST<LoginBody, LoginRespond>(v1.login, body);
  };
  //   getUserInfo = (body: UserBody): Promise<Record<string, any>> => {
  //     return this.POST<UserBody, Record<string, any>>(v1.userInfo, body);
  //   };
}

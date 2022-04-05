// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {ActionType} from 'src/redux/rootReducer';
import * as Actions from './actionTypes';
export const sendObject = (
  id: string,
  username: string,
  password: string,
): ActionType => {
  return {
    type: Actions.HOME_DATA,
    data: {
      id: id,
      username: username,
      password: password,
    },
  };
};

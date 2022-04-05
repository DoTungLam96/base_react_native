// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {ActionType} from 'src/redux/rootReducer';
import * as Actions from 'src/redux/home/action/actionTypes';

export type HomeModel = {
  id?: string;
  username?: string;
  password?: string;
};

const initState: HomeModel = {
  id: '',
  username: '',
  password: '',
};

export const homeReducer = (
  state = initState,
  action: ActionType,
): HomeModel => {
  switch (action.type) {
    case Actions.HOME_DATA: {
      return {
        ...state,
        id: action.data.id as string,
        username: action.data.username as string,
        password: action.data.password as string,
      };
    }
    case Actions.HOME_DATA_RESET: {
      return initState;
    }
    default:
      return initState;
  }
};

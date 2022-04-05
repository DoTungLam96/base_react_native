/* eslint-disable @typescript-eslint/no-unused-vars */
import {combineReducers} from 'redux';
import {HomeModel} from 'src/models/HomeModel';
import {homeReducer} from 'src/redux/home/reducer/homeReducer';
const reducerList = {
  homeReducer,
};

export type RootStateType = {
  homeReducer: HomeModel;
};

export type ActionType = {
  type: string;
  data: Record<string, any>;
};

export const rootReducer = combineReducers(reducerList);

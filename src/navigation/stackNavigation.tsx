/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DefaultTitleActionBar from 'src/components/base/DefaultTitleActionBar';
import {navigationRoutes} from 'src/constants/common';
import Login from 'src/features/Login/Login';
import Detail from 'src/features/ScreenDemo/Detail';
import BottomNavigation from './bottomNavigation';
const Stack = createNativeStackNavigator();
const NO_HEADER = {header: () => null};

const TitleHeader = (
  title: string,
  {
    rightIcon,
    onPressRight,
    iconType,
    onPressLeft,
    enableBackIcon = true,
  }: {
    rightIcon?: 'search' | 'scanBarcode';
    onPressRight?: () => void;
    onPressLeft?: () => void;
    enableBackIcon?: boolean;
    iconType?: 'close' | 'back' | 'menu';
  } = {},
) => {
  return {
    header: () => (
      <DefaultTitleActionBar
        title={title}
        iconType={iconType}
        isBackIcon={enableBackIcon}
        rightIconType={rightIcon}
        onPressRight={onPressRight}
        onPressLeft={onPressLeft}
      />
    ),
  };
};

export type RootStackParamList = {
  [navigationRoutes.HOME]: undefined;
  [navigationRoutes.LOGIN]: undefined;
  [navigationRoutes.BOTTOM_NAVIGATION]: undefined;
  [navigationRoutes.ACCOUNT]: undefined;
  [navigationRoutes.PRODUCT]: undefined;
  [navigationRoutes.TRANSACTION]: undefined;
  [navigationRoutes.DETAIL]: undefined;
};

const StackNavigation = (): React.ReactElement => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName={navigationRoutes.LOGIN}>
      <Stack.Screen
        options={TitleHeader('Trang chủ', {
          iconType: 'menu',
          enableBackIcon: true,
          onPressLeft: () => navigation.openDrawer(),
        })}
        name={navigationRoutes.BOTTOM_NAVIGATION}
        component={BottomNavigation}
      />

      <Stack.Screen
        name={navigationRoutes.LOGIN}
        options={NO_HEADER}
        component={Login}
      />

      <Stack.Screen
        name={navigationRoutes.DETAIL}
        options={TitleHeader('Thông tin chi tiết')}
        component={Detail}
      />
    </Stack.Navigator>
  );
};
export default StackNavigation;

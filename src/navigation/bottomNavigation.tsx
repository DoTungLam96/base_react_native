/* eslint-disable react-native/no-inline-styles */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image} from 'react-native';
import {navigationRoutes} from 'src/constants/common';
import images from 'src/constants/images';
import Home from 'src/features/Home/Home';
import Account from 'src/features/ScreenDemo/Account';
import Product from 'src/features/ScreenDemo/Product';
import Transaction from 'src/features/ScreenDemo/Transaction';

const Tab = createBottomTabNavigator();
// const customTabBarStyle = {
//   activeTintColor: '#259DB8',
//   inactiveTintColor: 'gray',
//   style: {backgroundColor: 'white'},
//   tabStyle: {paddingBottom: 3},
// };
type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator initialRouteName={navigationRoutes.HOME}>
      <Tab.Screen
        name={navigationRoutes.HOME}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}: TabBarIconProps) =>
            focused ? (
              <Image source={images.ic_home} style={{width: 24, height: 24}} />
            ) : (
              <Image
                source={images.ic_home_unactive}
                style={{width: 24, height: 24}}
              />
            ),
        }}
        component={Home}
      />
      <Tab.Screen
        name={navigationRoutes.PRODUCT}
        options={{
          tabBarLabel: 'Sản phẩm',
          headerShown: false,
          tabBarIcon: ({focused}: TabBarIconProps) =>
            focused ? (
              <Image
                source={images.ic_product}
                style={{width: 24, height: 24}}
              />
            ) : (
              <Image
                source={images.ic_product_unactive}
                style={{width: 24, height: 24}}
              />
            ),
        }}
        component={Product}
      />
      <Tab.Screen
        name={navigationRoutes.TRANSACTION}
        options={{
          tabBarLabel: 'Giao dịch',
          headerShown: false,
          tabBarIcon: ({focused}: TabBarIconProps) =>
            focused ? (
              <Image
                source={images.ic_transaction}
                style={{width: 24, height: 24}}
              />
            ) : (
              <Image
                source={images.ic_transaction_unactive}
                style={{width: 24, height: 24}}
              />
            ),
        }}
        component={Transaction}
      />
      <Tab.Screen
        name={navigationRoutes.ACCOUNT}
        options={{
          tabBarLabel: 'Tài khoản',
          headerShown: false,
          tabBarIcon: ({focused}: TabBarIconProps) =>
            focused ? (
              <Image
                source={images.ic_account}
                style={{width: 24, height: 24}}
              />
            ) : (
              <Image
                source={images.ic_account_unactive}
                style={{width: 24, height: 24}}
              />
            ),
        }}
        component={Account}
      />
    </Tab.Navigator>
  );
};
export default BottomNavigation;

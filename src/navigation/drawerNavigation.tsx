/* eslint-disable react-native/no-inline-styles */
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {navigationRoutes} from 'src/constants/common';
import images from 'src/constants/images';
import navigationService, {
  setNavigator,
} from 'src/navigation/navigationService';
import StackNavigation from './stackNavigation';
const Drawer = createDrawerNavigator();

const DrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{padding: 8}}>
        <TouchableOpacity style={{flexDirection: 'row', marginTop: 16}}>
          <Image source={images.ic_home} style={{width: 24, height: 24}} />
          <Text
            style={{
              fontSize: 14,
              color: '#000',
              fontWeight: 'bold',
              marginLeft: 16,
              paddingTop: 2,
            }}>
            Trang chủ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row', marginTop: 24}}>
          <Image source={images.ic_chat} style={{width: 24, height: 24}} />
          <Text
            style={{
              fontSize: 14,
              color: '#000',
              fontWeight: 'bold',
              marginLeft: 16,
              paddingTop: 2,
            }}>
            Trò chuyện
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigationService.navigate(navigationRoutes.LOGIN, undefined);
          }}
          style={{flexDirection: 'row', marginTop: 24}}>
          <Image source={images.ic_logout} style={{width: 24, height: 24}} />
          <Text
            style={{
              fontSize: 14,
              color: '#000',
              fontWeight: 'bold',
              marginLeft: 16,
              paddingTop: 2,
            }}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigation = (): React.ReactElement => {
  return (
    <NavigationContainer ref={setNavigator}>
      <Drawer.Navigator
        initialRouteName="Stack"
        screenOptions={{
          swipeEnabled: true,
        }}
        drawerContent={props => {
          return <DrawerContent props={props} />;
        }}>
        <Drawer.Screen
          name="Stack"
          component={StackNavigation}
          options={({route}) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const routeName = getFocusedRouteNameFromRoute(route);
            return {
              swipeEnabled:
                routeName === navigationRoutes.HOME ||
                routeName === navigationRoutes.BOTTOM_NAVIGATION,
              drawerLabel: 'Home',
              headerShown: false,
            };
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;

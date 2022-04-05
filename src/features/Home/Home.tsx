/* eslint-disable react-native/no-inline-styles */
import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import navigationService from 'src/navigation/navigationService';
import {navigationRoutes} from 'src/constants/common';
import {useSelector} from 'react-redux';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {RootStateType} from 'src/redux/rootReducer';

const Home = () => {
  const homeSelector = useSelector((state: RootStateType) => {
    return {
      id: state.homeReducer.id,
      username: state.homeReducer.username,
      password: state.homeReducer.password,
    };
  });

  useEffect(() => {
    console.log('homeSelector', homeSelector);
  }, [homeSelector]);

  return (
    <View style={{flex: 1, padding: 16}}>
      <Text
        style={{
          width: '100%',
          textAlign: 'center',
          color: '#700',
          fontSize: 16,
        }}>
        Hello, {homeSelector.username}
      </Text>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() =>
            navigationService.navigate(navigationRoutes.DETAIL, undefined)
          }>
          <Text
            style={{
              color: '#059df5',
              fontSize: 14,
              textDecorationLine: 'underline',
            }}>
            Navigate to Detail
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Home;

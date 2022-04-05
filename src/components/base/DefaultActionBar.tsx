/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import dimens from 'src/constants/dimens';
import Svgs from 'src/constants/Svgs';
import navigationService from 'src/navigation/navigationService';
import colors from 'src/constants/colors';
import {useDispatch, useSelector} from 'react-redux';


const getRightIcon = (rightIconType: 'setting' | 'scanBarcode') => {
  if (rightIconType === 'setting') {
    return <Svgs.OrderSetting width={20} height={20} />;
  } else {
   //todo
   return <View>
     <Text>Header</Text>
   </View>
  }
};

const DefaultActionBar = ({
  title,
  iconType = 'back',
  rightIconType,
  isTabSearch = false,
  rightText = '',
  onPressLeft,
  onPressRight,
  placeholderText,
}: {
  title?: string;
  iconType?: 'back' | 'plus';
  rightIconType?: 'setting' | 'scanBarcode';
  rightText?: string;
  isTabSearch?: boolean;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  onScanBarcode?: () => void;
  placeholderText?: string;
}): React.ReactElement => {

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={styles.main}>
        <TouchableOpacity
          onPress={() => {
            if (iconType === 'back') {
              onPressLeft ? onPressLeft() : navigationService.goBack();
            } else if (iconType === 'plus') {
              onPressLeft && onPressLeft();
            }
          }}
          style={styles.backButton}>
          {iconType === 'back' && <Svgs.BackHeader width={20} height={20} />}
          {iconType === 'plus' && (
            <View style={styles.plusView}>
              <Image
                style={{width: 15, height: 15}}
                source={require('../../assets/images/icon_common/plus.png')}
              />
            </View>
          )}
        </TouchableOpacity>
        {!isTabSearch ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title || ''}</Text>
          </View>
        ) : (
          <View style={styles.tabSearch}>
            <TouchableOpacity disabled>
              <Svgs.Search width={17} height={17} />
            </TouchableOpacity>

            <TextInput
              maxLength={30}
              returnKeyType="search"
              style={styles.inputPhone}
              placeholder={
                placeholderText ? placeholderText : 'Tìm kiếm'
              }
            />
          </View>
        )}
        {rightIconType === undefined ? (
          <TouchableOpacity onPress={() => onPressRight && onPressRight()}>
            <Text style={styles.txtDone}>{rightText}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => onPressRight && onPressRight()}
            style={styles.search}>
            {getRightIcon(rightIconType)}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3D6AF8',
    paddingTop: dimens.statusBarHeight || 0,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    flex: 1,
    alignItems: 'stretch',
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
  },
  tabSearch: {
    flex: 1,
    height: 35,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 15,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  search: {
    paddingRight: 16,
    paddingTop: 2,
  },
  txtDone: {
    marginRight: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  plusView: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginBottom: 5,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputPhone: {
    fontSize: 13,
    height: 40,
    flex: 1,
    marginRight: 30,
    marginLeft: 8,
  },
});

export default DefaultActionBar;

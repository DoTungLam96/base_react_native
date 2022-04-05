import React from 'react';
import {StyleSheet, Text, StatusBar, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import dimens from 'src/constants/dimens';
import Svgs from 'src/constants/Svgs';
import navigationService from 'src/navigation/navigationService';
import colors from 'src/constants/colors';

// TODO: fix dynamic margin top
const ActionBarNobg = ({
  title,
  iconType = 'back',
  rightIconType,
  rightText = '',
  onPressRight = () => null,
}: {
  title?: string;
  iconType?: 'close' | 'back';
  rightIconType?: 'search';
  rightText?: string;
  onPressRight?: () => void;
}): React.ReactElement => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.content}>
        <TouchableOpacity
          onPress={navigationService.goBack}
          style={styles.backButton}>
          {iconType === 'back' && <Svgs.BackHeaderBlack />}
          {iconType === 'close' && <Svgs.Close />}
        </TouchableOpacity>
        <Text style={styles.title}>{title || ''}</Text>
        {rightIconType === undefined ? (
          <TouchableOpacity onPress={onPressRight}>
            <Text style={styles.txtDone}>{rightText}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPressRight} style={styles.search}>
            {rightIconType === 'search' && (
              <Svgs.SearchIcon width={20} height={20} />
            )}
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.spacing} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64 + (dimens.statusBarHeight || 0),
    flexDirection: 'column',
  },
  content: {
    zIndex: 10,
    width: '100%',
    marginTop: 7 + (dimens.statusBarHeight || 0),
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: colors.black,
    textAlign: 'center',
    marginLeft: -15,
    flex: 1,
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
  spacing: {
    width: '100%',
    height: 1,
    backgroundColor: colors.color_707070,
  },
});

export default ActionBarNobg;

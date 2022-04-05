import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  View,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import dimens from 'src/constants/dimens';
import Svgs from 'src/constants/Svgs';
import navigationService from 'src/navigation/navigationService';
import colors from 'src/constants/colors';
import images from 'src/constants/images';

const getRightIcon = (rightIconType?: 'search' | 'scanBarcode' | 'options') => {
  if (rightIconType === 'search') {
    return <Svgs.SearchIcon width={20} height={20} />;
  } else if (rightIconType === 'options') {
    return <Svgs.OrderSetting width={20} height={20} />;
  }
};

const DefaultTitleActionBar = ({
  title,
  iconType = 'back',
  rightIconType,
  rightText = '',
  onPressLeft,
  onPressRight,
  isBackIcon,
}: {
  title?: string;
  iconType?: 'close' | 'back' | 'menu';
  rightIconType?: 'search' | 'scanBarcode' | 'options';
  rightText?: string;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  isBackIcon?: boolean;
}): React.ReactElement => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title || ''}</Text>
      </View>
      {isBackIcon ? (
        <TouchableOpacity
          onPress={() =>
            onPressLeft ? onPressLeft() : navigationService.goBack()
          }
          style={styles.backButton}>
          {iconType === 'back' && <Svgs.BackHeader width={20} height={20} />}
          {iconType === 'close' && <Svgs.Close />}
          {iconType === 'menu' && (
            <Image source={images.icon_menu} style={{width: 20, height: 20}} />
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#259DB8',
    justifyContent: 'space-between',
    paddingTop: dimens.statusBarHeight || 0,
  },
  backButton: {
    padding: 16,
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
  search: {
    paddingRight: 16,
    paddingTop: 2,
  },
  txtDone: {
    marginRight: 20,
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
  },
});

export default DefaultTitleActionBar;

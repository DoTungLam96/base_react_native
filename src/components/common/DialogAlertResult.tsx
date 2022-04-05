/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal, {
  ModalContent,
  ModalPortal,
  ScaleAnimation,
} from 'react-native-modals';
import defaultStyles from 'src/common/styles';
import colors from 'src/constants/colors';
import Svgs from 'src/constants/Svgs';
import i18n from 'src/locales/i18n';
import {themeFonts, themeSizes} from 'src/theme/theme';

const widthScreen = Dimensions.get('window').width;
const height = 0.9 * widthScreen;

interface Button {
  text?: string;
  onPress?: () => void;
}

interface Options {
  children?: React.ReactNode;
  onDismiss?: () => void;
  cancelable?: boolean;
}

export enum AlertType {
  Error = 1,
  Success = 2,
  Warning = 3,
  Confirm = 4,
}

export default class DialogAlertResult {
  static show(
    alertType?: AlertType,
    title = '',
    message = '',
    buttons: Button[] = [],
    options: Options = {},
  ): void {
    const {children} = options;

    function onPressActionButton(button: Button) {
      let onPress: () => void = () => null;
      if (button && button.onPress && typeof button.onPress === 'function') {
        onPress = button.onPress;
      }
      dismissDialog(onPress);
    }

    function dismissDialog(callback: () => void = () => null) {
      ModalPortal.dismissAll();
      typeof callback === 'function' && callback();
    }

    function onDismiss() {
      if (
        options &&
        options.onDismiss &&
        typeof options.onDismiss === 'function'
      ) {
        options.onDismiss();
      }
    }

    function onTouchOutside() {
      if (
        options &&
        (options.cancelable === true || options.cancelable === undefined)
      ) {
        dismissDialog();
      }
    }

    function onHardwareBackPress() {
      if (
        options &&
        (options.cancelable === true || options.cancelable === undefined)
      ) {
        dismissDialog();
      }
      return true;
    }

    ModalPortal.show(
      <Modal
        useNativeDriver
        visible={true}
        width={0.9}
        onDismiss={onDismiss}
        // onTouchOutside={() => onTouchOutside()}
        onHardwareBackPress={() => onHardwareBackPress()}
        modalAnimation={new ScaleAnimation()}
        modalTitle={
          title ? (
            <View style={styles.titleContainer}>
              {alertType === AlertType.Error && <Svgs.AlertError />}
              {alertType === AlertType.Success && <Svgs.AlertSuccess />}
              {alertType === AlertType.Warning && <Svgs.AlertWarning />}
              <Text style={styles.title}>{title}</Text>
            </View>
          ) : null
        }>
        <ModalContent style={styles.container}>
          {message ? <Text style={styles.message}>{message}</Text> : null}

          {buttons && buttons.length === 1 && (
            <TouchableOpacity
              onPress={() => onPressActionButton(buttons[0])}
              style={[styles.button, styles.halfWidth, styles.buttonInfo]}>
              <Text style={styles.buttonText}>{buttons[0].text}</Text>
            </TouchableOpacity>
          )}
          {buttons && buttons.length === 2 && (
            <View style={defaultStyles.row}>
              <TouchableOpacity
                onPress={() => onPressActionButton(buttons[0])}
                style={[
                  styles.button,
                  defaultStyles.flex_1,
                  defaultStyles.mr_1,
                  styles.buttonOutlinedInfo,
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: colors.color_common,
                    },
                  ]}>
                  {buttons[0].text}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onPressActionButton(buttons[1])}
                style={[
                  styles.button,
                  defaultStyles.flex_1,
                  defaultStyles.ml_1,
                  styles.buttonInfo,
                ]}>
                <Text style={styles.buttonText}>{buttons[1].text}</Text>
              </TouchableOpacity>
            </View>
          )}
          {!buttons ||
            (buttons && buttons.length === 0 && (
              <TouchableOpacity
                onPress={() => dismissDialog()}
                style={[
                  styles.button,
                  styles.halfWidth,
                  alertType === AlertType.Error
                    ? styles.buttonFailed
                    : alertType === AlertType.Warning
                    ? styles.buttonWarning
                    : alertType === AlertType.Confirm
                    ? styles.buttonInfo
                    : alertType === AlertType.Success
                    ? styles.buttonSuccess
                    : null,
                ]}>
                <Text style={styles.buttonText}>
                  {i18n.t('common:button_close')}
                </Text>
              </TouchableOpacity>
            ))}

          {Boolean(children) && children}
        </ModalContent>
      </Modal>,
    );
  }

  static showSuccess(
    title = '',
    message = '',
    buttons: Button[] = [],
    options: Options = {},
  ): void {
    DialogAlertResult.show(AlertType.Success, title, message, buttons, options);
  }

  static showConfirm(
    title = '',
    message = '',
    buttons: Button[] = [],
    options: Options = {},
  ): void {
    DialogAlertResult.show(AlertType.Confirm, title, message, buttons, options);
  }

  static showError(
    title = '',
    message = '',
    buttons: Button[] = [],
    options: Options = {},
  ): void {
    DialogAlertResult.show(AlertType.Error, title, message, buttons, options);
  }

  static showWarning(
    title = '',
    message = '',
    buttons: Button[] = [],
    options: Options = {},
  ): void {
    DialogAlertResult.show(AlertType.Warning, title, message, buttons, options);
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: height / 2,
  },
  title: {
    fontSize: themeSizes.largeText,
    fontFamily: themeFonts.medium,
    color: colors.black,
    marginTop: 10,
    // fontWeight: 'bold',
  },
  message: {
    fontSize: themeSizes.normalText,
    fontFamily: themeFonts.regular,
    color: colors.color_707070,
    marginTop: 14,
    marginBottom: 18,
    textAlign: 'center',
  },
  negative: {
    fontSize: themeSizes.mediumText,
    // fontFamily: themeFonts.bold,
    color: colors.color_0A0A12,
  },
  positive: {
    fontSize: themeSizes.mediumText,
    // fontFamily: themeFonts.bold,
    color: colors.color_0A0A12,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  button: {
    height: 45,
    marginTop: 16,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 12,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSuccess: {
    borderColor: colors.color_success,
    backgroundColor: colors.color_success,
  },
  buttonFailed: {
    borderColor: colors.color_error,
    backgroundColor: colors.color_error,
  },
  buttonWarning: {
    borderColor: colors.color_warning,
    backgroundColor: colors.color_warning,
  },
  buttonInfo: {
    borderColor: colors.color_common,
    backgroundColor: colors.color_common,
  },
  buttonText: {
    color: colors.white,
    fontSize: themeSizes.mediumText,
    textAlign: 'center',
    paddingHorizontal: 16,
    fontFamily: themeFonts.medium,
  },
  buttonOutlinedSuccess: {
    borderColor: colors.color_success,
    backgroundColor: colors.white,
  },
  buttonOutlinedFailed: {
    borderColor: colors.color_error,
    backgroundColor: colors.white,
  },
  buttonOutlinedWarning: {
    borderColor: colors.color_warning,
    backgroundColor: colors.white,
  },
  buttonOutlinedInfo: {
    borderColor: colors.color_common,
    backgroundColor: colors.white,
  },
  halfWidth: {
    width: '50%',
  },
});

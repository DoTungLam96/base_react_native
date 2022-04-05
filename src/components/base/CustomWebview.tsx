import React from 'react';
import {StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

const CustomWebview = ({url}: {url: string}): React.ReactElement => {
  return (
    <WebView
      source={{uri: url}}
      onNavigationStateChange={(e) => {
        console.log(e.url);
      }}
    />
  );
};

export default CustomWebview;

const styles = StyleSheet.create({});

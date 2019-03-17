// src/components/common/button/styles.android.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  baseButtonStyle: {
    alignSelf: 'stretch',
    paddingVertical: 12,
  },
  baseTextStyle: {
    alignSelf: 'center',
  },
  imageStyle: {
    height: 32,
    width: 32,
  },
  primaryButtonStyle: {
  },
  primaryButtonTextStyle: {
    color: '#FFF',
  },
  secondaryButtonStyle: {
    borderWidth: 1,
    borderColor: '#1BAC95',
    backgroundColor: '#FFF',
  },
  secondaryButtonTextStyle: {
    color: '#1BAC95',
  },
  invertedPrimaryButtonStyle: {
    backgroundColor: '#FFF',
  },
  invertedPrimaryButtonTextStyle: {
    color: '#1BAC95',
  },
  invertedSecondaryButtonStyle: {
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: 'transparent',
  },
  invertedSecondaryButtonTextStyle: {
    color: '#FFF',
  },
  destructivePrimaryButtonStyle: {
  },
  destructivePrimaryButtonTextStyle: {
    color: '#FFF',
  },
  destructiveSecondaryButtonStyle: {
    borderWidth: 1,
    borderColor: '#DC584F',
  },
  destructiveSecondaryButtonTextStyle: {
    color: '#DC584F',
  },
  disabledButtonStyle: {
    backgroundColor: '#E9E9E9',
  },
  disabledButtonTextStyle: {
    color: '#B8B8B8',
  },
});

export default styles;

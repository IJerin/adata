// src/components/menuContentView/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  separatorContainerStyle: {
    marginTop: 24,
  },
  contentContainerStyle: {
    position: 'relative',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 24,
  },
  largeTextStyle: {
    fontSize: 20,
    lineHeight: 24,
  },
  boldTextStyle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  largeBoldTextStyle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
  },
  buttonContainerStyle: {
    borderColor: '#CCC',
    borderTopWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    height: 72,
  },
});

export default styles;

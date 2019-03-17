// src/components/menuContent/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  scrollContainerStyle: {
    position: 'relative',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  separatorContainerStyle: {
    marginTop: 24,
  },
  headingTextStyle: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
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
  titleTextStyle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '800',
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
  errorTextStyle: {
    fontSize: 14,
    color: 'red',
    marginBottom: 12,
  },
});

export default styles;

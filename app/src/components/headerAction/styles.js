// src/components/headerActions/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    position: 'relative',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flex: 1,
    marginTop: 20,
    paddingVertical: 8,
  },
  iconContainerStyle: {
    position: 'absolute',
    top: -4,
    padding: 8,
  },
  iconLeftStyle: {
    left: 16,
  },
  iconRightStyle: {
    right: 16,
  },
  iconStyle: {
    height: 24,
    width: 24,
  },
});

export default styles;

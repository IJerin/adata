// src/components/common/navigationView/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    position: 'relative',
  },
  imageContainerStyle: {
    position: 'absolute',
    right: 24,
    top: 32,
  },
  imageStyle: {
    height: 122,
    width: 122,
    borderRadius: 5,
  },
});

export default styles;

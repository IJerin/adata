// src/components/header/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  normalContainerStyle: {
    height: 68,
    position: 'relative',
    flexDirection: 'row',
  },
  backgroundImageContainerStyle: {
    position: 'relative',
    width: '100%',
  },
  backgroundContainerStyle: {
    height: 68,
    position: 'absolute',
    right: 0,
    left: 0,
  },
  backdropIconStyle: {
    height: 68,
    width: '100%',
  },
  frontContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
  },
});

export default styles;

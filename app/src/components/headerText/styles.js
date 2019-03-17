// src/components/headerText/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  logoStyle: {
    height: 24,
    width: 115,
  },
  titleStyle: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
    lineHeight: 24,
    alignItems: 'center',
  },
});

export default styles;

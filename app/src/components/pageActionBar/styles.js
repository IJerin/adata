// src/components/pageActionBar/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#F8F8F8',
    height: 48,
    paddingHorizontal: 24,
    paddingVertical: 12,
    position: 'relative',
    flexDirection: 'row',
  },
  inputStyle: {
    color: '#333',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    flex: 4,
  },
  iconContainerStyle: {
    alignItems: 'flex-end',
    flex: 1,
  },
  iconStyle: {
    height: 24,
    width: 24,
  },
});

export default styles;

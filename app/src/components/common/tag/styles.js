// src/components/common/carousel/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 20,
  },
  textStyle: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 4,
  },
  imageStyle: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
});

export default styles;

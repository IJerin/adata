// src/components/photoZoomView/styles.js

import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingTop: 12,
    backgroundColor: 'black',
  },
  imageContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: Dimensions.get('window').width - 100,
    width: Dimensions.get('window').width,
  },
});

export default styles;

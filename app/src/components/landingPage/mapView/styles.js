// src/components/landingPage/mapView/styles.js

import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  mapViewStyle: {
    flex: 1,
    marginBottom: 16,
  },
  mapStyle: {
    height: 400,
    width: Dimensions.get('window').width,
  },
});

export default styles;

// src/components/common/loadingBar/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: 24,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
    height: 8,
  },
  outerBarStyle: {
    backgroundColor: '#E9E9E9',
    borderRadius: 4,
    padding: 2,
    alignSelf: 'stretch',
  },
  innerBarStyle: {
    backgroundColor: '#F6C423',
    borderRadius: 2,
    height: 4,
  },
});

export default styles;

// src/components/common/checkbox/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkboxContainerStyle: {
    marginRight: 8,
  },
  emptyCheckboxStyle: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 2,
    height: 20,
    width: 20,
  },
  selectedCheckboxStyle: {
    height: 20,
    width: 20,
  },
  errorStyle: {
    fontSize: 12,
    lineHeight: 16,
    color: '#DC584F',
    marginTop: 4,
  },
});

export default styles;

// src/components/common/datePicker/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  containerRowStyle: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  dateContainerStyle: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  dateTextStyle: {
    color: '#B8B8B8',
    fontSize: 16,
    lineHeight: 20,
  },
  selectedDateTextStyle: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});

export default styles;

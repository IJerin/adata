// src/components/common/listItem/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    paddingVertical: 4,
    alignSelf: 'stretch',
  },
  selectorStyle: {
    width: 4,
    height: 32,
    backgroundColor: '#F5C323',
    marginVertical: -4,
  },
  selectedStyle: {
    backgroundColor: 'rgba(245, 195, 35, 0.1)',
    marginHorizontal: -24,
  },
  imageStyle: {
    height: 24,
    width: 24,
    marginRight: 8,
  },
  wrapperContainerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  labelContainerStyle: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  labelTextStyle: {
    color: '#333333',
    fontWeight: '800',
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 2,
  },
  valueContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  valueTextStyle: {
    color: '#595959',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'right',
    paddingVertical: 2,
  },
});

export default styles;

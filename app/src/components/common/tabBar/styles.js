// src/components/common/tabBar/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  tabBarStyle: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#D4D4D4',
  },
  tabContainerStyle: {
    flex: 1,
  },
  tabStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedTabStyle: {
    marginBottom: -1,
    paddingBottom: 13,
  },
  tabTextStyle: {
  },
});

export default styles;

// src/components/landingPage/homeView/styles.js

import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    marginTop: 32,
    marginBottom: 12,
    marginHorizontal: 24,
  },
  slideStyle: {
    marginTop: 16,
    marginBottom: 20,
  },
  slideShadowStyle: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 6,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  photoContainerStyle: {
    flexDirection: 'row',
  },
  headerStyle: {
    marginBottom: 16,
    fontSize: 18,
    color: 'rgba(51, 51, 51, 1)',
    lineHeight: 22,
    fontWeight: '800',
  },
});

export default styles;

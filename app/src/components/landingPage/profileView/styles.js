// src/components/landingPage/profileView/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  textStyle: {
    fontSize: 18,
  },
  bannerContainerStyle: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  profileImageStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFF',
    paddingTop: 8,
  },
  authorNameStyle: {
    marginTop: 12,
  },
  descriptionStyle: {
    marginTop: 4,
    textAlign: 'center',
  },
  buttonStyle: {
    width: 192,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 4,
    marginTop: 12,
    paddingVertical: 7,
  },
  buttonTextStyle: {
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '600',
  },
  gridTitleContainerStyle: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 7,
  },
  gridTitleStyle: {
    marginVertical: 9,
  },
  mapIconContainerStyle: {
    position: 'absolute',
    padding: 8,
    right: -8,
  },
  mapIconStyle: {
    height: 24,
    width: 24,
  },
});

export default styles;

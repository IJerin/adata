// src/components/splashScreen/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    position: 'relative',
  },
  backgroundContainerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImgStyle: {
    height: '100%',
    width: '100%',
  },
  keyboardScrollContainerStyle: {
    flexGrow: 1,
  },
  logoContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImgStyle: {
    height: 165,
    width: 230, // TODO: Better way to auto-size?
  },
  titleStyle: {
    marginTop: 2,
    fontSize: 18,
    lineHeight: 24,
    color: '#FFF',
    fontWeight: '400',
    backgroundColor: 'transparent',
  },
  fieldContainerStyle: {
    flex: 1,
  },
  fieldInnerContainerStyle: {
    margin: 24,
  },
  fieldInputStyle: {
    marginBottom: 12,
  },
  titleTextStyle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  checkboxContainerStyle: {
    marginVertical: 16,
  },
});

export default styles;

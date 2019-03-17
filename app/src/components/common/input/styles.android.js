// src/components/common/input/styles.android.js

// Import the dependencies of the style sheet
import { StyleSheet } from 'react-native';

// Create the style sheet
const styles = StyleSheet.create({
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 14,
    lineHeight: 23,
    flex: 2,
  },
  labelStyle: {
    fontSize: 14,
    paddingLeft: 10,
    flex: 1,
  },
  containerStyle: {
    height: 48,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageStyle: {
    fontSize: 12,
    lineHeight: 16,
    color: '#AAA',
    marginTop: 4,
  },
  errorStyle: {
    color: '#DC584F',
  },
});

// Make the style sheet available to other parts of the app
export default styles;


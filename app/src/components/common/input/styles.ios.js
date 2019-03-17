// src/components/common/input/styles.ios.js

// Import the dependencies of the style sheet
import { StyleSheet } from 'react-native';

// Create the style sheet
const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 16,
    lineHeight: 24,
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
    borderWidth: 1,
    borderColor: '#AAA',
    borderRadius: 3,
    padding: 12,
  },
  messageStyle: {
    fontSize: 12,
    lineHeight: 16,
    color: '#444',
    marginTop: 4,
  },
  errorStyle: {
    color: '#DC584F',
  },
});

// Make the style sheet available to other parts of the app
export default styles;

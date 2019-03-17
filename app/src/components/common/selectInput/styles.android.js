// src/components/common/selectInput/styles.android.js

// Import the dependencies of the style sheet
import { StyleSheet } from 'react-native';

// Create the style sheet
const styles = StyleSheet.create({
  optionTextStyle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    marginLeft: 4,
  },
  inputContainerStyle: {
    flex: 1,
    height: 48,
    width: null,
    flexDirection: 'row',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#AAA',
    borderRadius: 3,
  },
  inputStyle: {
    color: '#000',
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
    padding: 12,
  },
  iconStyle: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 24,
    width: 24,
    marginTop: 12,
    marginRight: 4,
  },
  scrollStyle: {
    width: '100%',
    maxHeight: 150,
    borderColor: '#AAA',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});

// Make the style sheet available to other parts of the app
export default styles;

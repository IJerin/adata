// src/components/directionsPanel/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonContainerStyle: {
    borderColor: '#CCC',
    borderTopWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    height: 72,
  },
  modalButtonStyle: {
    marginBottom: 4,
    height: 48,
  },
  intermediateModalButtonContainer: {
    marginTop: -10,
  },
  intermediateModalButton: {
    marginBottom: 10,
    borderRadius: 4,
  },
  modalCancelButtonStyle: {
    marginTop: 12,
    height: 48,
  },
});

export default styles;

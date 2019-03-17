// src/components/common/previewListItem/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  previewContainerStyle: {
    flexDirection: 'row',
    marginHorizontal: 24,
  },
  previewFirstColumnContainerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  previewInnerContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 12,
  },
  previewTitleStyle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '800',
    color: '#333333',
  },
  previewSubtitleStyle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#595959',
  },
  previewSecondColumnContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerIconStyle: {
    height: 24,
    width: 24,
  },
});

export default styles;

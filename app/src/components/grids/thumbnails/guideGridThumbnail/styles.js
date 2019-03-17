// src/components/grids/thumbnails/gridThumbnail/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    position: 'relative',
  },
  userContainerStyle: {
    flexDirection: 'row',
    position: 'relative',
    top: 4,
    zIndex: 2,
  },
  userImageStyle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderColor: 'white',
    borderWidth: 2,
  },
  userTextStyle: {
    paddingLeft: 4,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    color: 'rgba(51,51,51,1)',
  },
  thumbnailStyle: {
    borderRadius: 4,
  },
  guideTitleTextStyle: {
    paddingTop: 4,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    color: 'rgba(51,51,51,1)',
  },
  guideLocationTextStyle: {
    fontSize: 12,
    lineHeight: 16,
    color: 'rgba(118, 118, 118, 1)',
  },
});

export default styles;

// src/components/guideDetailGridView/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainerStyle: {
    flex: 1,
    position: 'relative',
  },
  imageStyle: {
    height: 325,
    width: null,
  },
  tagStyle: {
    flex: 1,
    position: 'absolute',
    left: 24,
    bottom: 10,
  },
  contentContainerStyle: {
    marginTop: 12,
  },
  guideTitleStyle: {
    paddingTop: 16,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '800',
    color: '#333333',
  },
  guideDescriptionStyle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#595959',
  },
  guideLocationContainerStyle: {
    flex: 1,
    marginTop: 2,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  guideLocationStyle: {
    fontSize: 12,
    lineHeight: 16,
    color: '#767676',
  },
  separatorContainerStyle: {
    marginVertical: 16,
  },
  separatorStyle: {
    height: 1,
    backgroundColor: '#E9E9E9',
    marginTop: 24,
  },
  authorContainerStyle: {
    marginBottom: 4,
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
  mapIconContainerStyle: {
    position: 'absolute',
    right: -8,
    top: -8,
    padding: 8,
  },
  mapIconStyle: {
    height: 24,
    width: 24,
  },
});

export default styles;

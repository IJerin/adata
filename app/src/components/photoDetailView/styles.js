// src/components/photoDetailView/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainerStyle: {
    position: 'relative',
    flex: 1,
  },
  tagStyle: {
    flex: 1,
    position: 'absolute',
    left: 24,
    bottom: 10,
  },
  bookmarkStyle: {
    position: 'absolute',
    right: 16,
    bottom: 4,
  },
  contentContainerStyle: {
    paddingHorizontal: 24,
  },
  titleLabelStyle: {
    paddingTop: 16,
    paddingBottom: 2,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 28,
    color: '#333333',
  },
  subTitleLabelStyle: {
    color: '#767676',
    marginBottom: 8,
  },
  mapContainerStyle: {
    paddingTop: 20,
    borderRadius: 4,
  },
  descriptionContainerStyle: {
    marginTop: 20,
  },
  entranceInfoContainerStyle: {
    marginTop: 12,
    flex: 1,
    flexDirection: 'row',
  },
  entranceInfoSubContainerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  entranceInfoIconStyle: {
    height: 24,
    width: 24,
    marginRight: 4,
  },
  entranceInfoTextStyle: {
    marginVertical: 2,
    color: '#1BAC95',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  parkingMapContainerStyle: {
    marginTop: 12,
  },
  detailMainLabelStyle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 22,
    color: '#333333',
    marginBottom: 4,
  },
  parkingStyle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 22,
    color: '#333333',
    marginTop: 24,
    marginBottom: 4,
  },
  detailSubLabelStyle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    color: '#595959',
  },
  detailButtonContainerStyle: {
    marginTop: 12,
  },
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
  modalCancelButtonStyle: {
    marginTop: 12,
    height: 48,
  },
});

export default styles;

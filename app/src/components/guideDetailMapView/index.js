// src/components/guideDetailMapView/index.js

import React from 'react';
import { View } from 'react-native';

import { ViewContainer } from '../common/';
import Header from '../header/';
import PhotoMap from '../photoMap/';
import PhotoMapCarousel from '../carousels/photoMapCarousel/';

const MapView = () => {
  const mapContainerStyle = { flex: 1, position: 'relative' };

  return (
    <ViewContainer>
      <View style={mapContainerStyle}>
        <PhotoMap />
        <PhotoMapCarousel />
        <Header allowBack absolute />
      </View>
    </ViewContainer>
  );
};

export default MapView;

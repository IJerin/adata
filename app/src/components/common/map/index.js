
// src/components/common/map/index.js

import React, { Component } from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import PropTypes from 'prop-types';

import customMapStyle from './data/mapStyle.json';
import styles from './styles';

const propTypes = {
  centerCoordinates: PropTypes.object.isRequired,
  renderMarkers: PropTypes.func.isRequired,
  height: PropTypes.number,
  disabled: PropTypes.bool,
  zoomed: PropTypes.bool,
  rounded: PropTypes.bool,
};

const defaultProps = {
  height: 0,
  disabled: false,
  zoomed: false,
  rounded: false,
};

class Map extends Component {
  constructor() {
    super();

    this._map = null;
  }

  animateToCoordinate(latLng, duration) {
    this._map.animateToCoordinate(latLng, duration);
  }

  render() {
    const {
      renderMarkers,
      centerCoordinates,
      height,
      disabled,
      rounded,
      zoomed,
    } = this.props;

    const { containerStyle, mapStyle } = styles;
    const region = {
      latitude: centerCoordinates.lat,
      longitude: centerCoordinates.long,
      latitudeDelta: zoomed ? 0.011525 : 0.0922,
      longitudeDelta: zoomed ? 0.005263 : 0.0421,
    };

    let adjustedMapStyle = mapStyle;

    if (rounded) {
      adjustedMapStyle = [mapStyle, { borderRadius: 5 }];
    }

    return (
      <View style={height ? [containerStyle, { height }] : containerStyle}>
        <MapView
          ref={(m) => { this._map = m; }}
          // mapType={'hybrid'}
          style={adjustedMapStyle}
          customMapStyle={customMapStyle}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          zoomEnabled={!disabled}
          rotateEnabled={!disabled}
          scrollEnabled={!disabled}
          pitchEnabled={!disabled}
          showsUserLocation
        >
          {renderMarkers()}
        </MapView>
      </View>
    );
  }
}


Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export { Map };

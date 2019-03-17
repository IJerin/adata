// src/components/markers/parkingMarker/index.js

import React, { Component } from 'react';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';

const propTypes = {
  marker: PropTypes.object.isRequired,
};

class ParkingMarker extends Component {
  getMarkerImage() {
    return require('./img/icon-map-marker-parking.png');
  }

  handlePress() {}

  render() {
    const { marker } = this.props;

    return (
      <MapView.Marker
        coordinate={{
          latitude: marker.lat,
          longitude: marker.long,
        }}
        image={this.getMarkerImage()}
        onPress={() => this.handlePress()}
      />
    );
  }
}

ParkingMarker.propTypes = propTypes;

export default ParkingMarker;

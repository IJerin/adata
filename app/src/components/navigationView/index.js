// src/components/navigationView/index.js

import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ViewContainer, Map } from '../common/';
import Header from '../header/';
import DirectionsPanel from '../directionsPanel/';
import LocationMarker from '../markers/locationMarker/';
import ParkingMarker from '../markers/parkingMarker/';
import styles from './styles';
import UtilFunctions from '../../util/UtilFunctions';

const propTypes = {
  location: PropTypes.object.isRequired,
  parking: PropTypes.bool,
  disabled: PropTypes.bool,
};

const defaultProps = {
  parking: false,
  disabled: false,
};

const NavigationView = (props) => {
  const { location, parking, disabled } = props;
  const { contentContainerStyle, imageContainerStyle, imageStyle } = styles;

  const markers = [];

  if (location.parking) {
    if (parking) {
      markers.push(location.parking);
      markers.push(location);
    } else {
      markers.push(location);
      markers.push(location.parking);
    }
  } else {
    markers.push(location);
  }

  const renderMarkers = () => (
    markers.map((m) => {
      if (m.parking) {
        return <ParkingMarker key={m.id} marker={m} />;
      }

      return <LocationMarker key={m.id} marker={m} active disabled />;
    })
  );

  const centerCoordinates = UtilFunctions.getCenterCoordinates(markers);

  return (
    <ViewContainer>
      <View style={contentContainerStyle}>
        <Map
          renderMarkers={() => renderMarkers()}
          centerCoordinates={centerCoordinates}
          zoomed
          disabled
        />
        <View style={imageContainerStyle}>
          <Image style={imageStyle} source={location.image} />
        </View>
        <Header allowBack absolute />
      </View>
      <DirectionsPanel
        location={location}
        disabled={disabled}
      />
    </ViewContainer>
  );
};

const mapStateToProps = (state) => {
  const { guides, selectedGuideId, selectedMarkerId } = state;

  const guide = guides.find(g => g.id === selectedGuideId);
  const location = guide.markers.find(m => m.id === selectedMarkerId);

  return { location };
};

NavigationView.propTypes = propTypes;
NavigationView.defaultProps = defaultProps;

export default connect(mapStateToProps)(NavigationView);

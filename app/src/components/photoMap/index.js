
// src/components/map/index.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Map } from '../common/';
import LocationMarker from '../markers/locationMarker/';
import UtilFunctions from '../../util/UtilFunctions';

const propTypes = {
  selectedMarker: PropTypes.object.isRequired,
  markers: PropTypes.arrayOf(PropTypes.object).isRequired,
  centerCoordinates: PropTypes.object.isRequired,
  markerClicked: PropTypes.bool.isRequired,
};

const defaultProps = {
  disabled: false,
};

class PhotoMap extends Component {
  constructor() {
    super();

    this.map = null;
  }

  componentWillUpdate(nextProps) {
    const { selectedMarker } = this.props;

    // Ignore all updates where the selected marker hasn't changed
    if (selectedMarker.id !== nextProps.selectedMarker.id) {
      // If there is a selected marker at all
      if (selectedMarker) {
        // Ignore all clicks directly on a marker itself
        if (!nextProps.markerClicked) {
          this.map.animateToCoordinate({
            latitude: nextProps.selectedMarker.lat,
            longitude: nextProps.selectedMarker.long,
          }, 0);
        }
      }
    }
  }

  renderMarkers() {
    return this.props.markers.map(marker => (
      <LocationMarker key={marker.id} marker={marker} />
    ));
  }

  render() {
    const {
      centerCoordinates,
    } = this.props;

    return (
      <Map
        ref={(m) => { this.map = m; }}
        renderMarkers={() => this.renderMarkers()}
        centerCoordinates={centerCoordinates}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { guides, selectedGuideId, selectedMarkerId, markerClicked } = state;
  let markers = null;
  let centerCoordinates = null;
  let selectedMarker = null;

  // If no marker is passed to the map show all in the selected guide
  if (!ownProps.markers || ownProps.markers.length === 0) {
    const guide = guides.find(g => g.id === selectedGuideId);

    markers = guide.markers;
    selectedMarker = markers.find(m => m.id === selectedMarkerId);

    centerCoordinates = UtilFunctions.createCoordinatesObj(selectedMarker.lat, selectedMarker.long);
  } else {
    // If the map is showing a single/parking marker
    markers = ownProps.markers;
    centerCoordinates = UtilFunctions.createCoordinatesObj(markers[0].lat, markers[0].long);

    selectedMarker = markers[0];
  }

  return {
    centerCoordinates,
    markers,
    selectedMarker,
    markerClicked,
  };
};

PhotoMap.propTypes = propTypes;
PhotoMap.defaultProps = defaultProps;

export default connect(mapStateToProps)(PhotoMap);

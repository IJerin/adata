// src/components/markers/locationMarker/index.js

import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../../actions/';

const propTypes = {
  selectMarker: PropTypes.func.isRequired,
  clickMarker: PropTypes.func.isRequired,
  marker: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

const defaultProps = {
  disabled: false,
};

class LocationMarker extends Component {
  getMarkerImage() {
    const { active } = this.props;

    if (active) {
      return require('./img/icon-map-marker-selected.png');
    }

    return require('./img/icon-map-marker.png');
  }

  handlePress(disabled) {
    if (disabled) {
      return;
    }

    this.props.clickMarker(true);
    this.props.selectMarker(this.props.marker.id);
  }

  render() {
    const { marker, active, disabled } = this.props;

    return (
      <MapView.Marker
        style={active ? { zIndex: 1 } : {}}
        coordinate={{
          latitude: marker.lat,
          longitude: marker.long,
        }}
        image={this.getMarkerImage()}
        onPress={() => this.handlePress(disabled)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let active = ownProps.active;

  if (active === undefined) {
    active = state.selectedMarkerId === ownProps.marker.id;
  }

  return { active };
};

LocationMarker.propTypes = propTypes;
LocationMarker.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(LocationMarker);

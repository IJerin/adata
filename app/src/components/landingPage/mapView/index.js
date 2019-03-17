// src/components/landingPage/mapView/index.js

import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import PhotoMap from '../../photoMap/';
import GuideMapCarousel from '../../carousels/guideMapCarousel/';
import styles from './styles';

const propTypes = {
  guides: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapView = (props) => {
  const {
    containerStyle,
    mapViewStyle,
    mapStyle,
  } = styles;

  return (
    <View style={containerStyle}>
      <PhotoMap />
      <GuideMapCarousel />
    </View>
  );
};

const mapPropsToState = (state) => {
  const { guides } = state;

  return { guides };
};

mapView.propTypes = propTypes;

export default connect(mapPropsToState)(mapView);

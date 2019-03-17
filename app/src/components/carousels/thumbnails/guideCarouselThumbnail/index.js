// src/components/carousels/thumbnails/guideCarouselThumbnail/index.js

import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../../../actions/';
import UtilFunctions from '../../../../util/UtilFunctions';
import styles from './styles';

const propTypes = {
  guide: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
};

class GuideCarouselThumbnail extends Component {
  handlePress(id) {
    console.info(id);
  }

  render() {
    const {
      guide,
      width,
      height,
      style,
    } = this.props;

    const {
      id,
      image,
      title,
      location,
    } = guide;

    const {
      containerStyle,
      imageStyle,
      titleTextStyle,
      locationTextStyle,
    } = styles;

    return (
      <View key={id} style={[containerStyle, style]}>
        <TouchableWithoutFeedback onPress={() => this.handlePress(id)}>
          <Image style={[imageStyle, { width, height }]} source={image} />
        </TouchableWithoutFeedback>
        <Text
          style={titleTextStyle}
          ellipsizeMode={'tail'}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={locationTextStyle}
          ellipsizeMode={'tail'}
          numberOfLines={1}
        >
          {UtilFunctions.printLocation(location, true)}
        </Text>
      </View>
    );
  }
}

GuideCarouselThumbnail.propTypes = propTypes;

export default connect(null, actions)(GuideCarouselThumbnail);

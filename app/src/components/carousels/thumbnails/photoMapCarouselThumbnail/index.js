// src/components/carousels/thumbnails/photoMapCarouselThumbnail/index.js

import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import * as actions from '../../../../actions/';
import Bookmark from '../../../bookmark/';
import styles from './styles';

const propTypes = {
  selectMarker: PropTypes.func.isRequired,
  thumbnail: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  active: PropTypes.bool,
};

const defaultProps = {
  active: false,
};

class PhotoMapCarouselThumbnail extends Component {
  handlePress(id) {
    this.props.selectMarker(id);
    Actions.photoDetail();
  }

  renderTitle() {
    const { active, thumbnail } = this.props;
    const {
      titleStyle,
      subtitleStyle,
    } = styles;

    if (active) {
      return (
        <View>
          <Text
            style={titleStyle}
            ellipsizeMode={'tail'}
            numberOfLines={1}
          >
            {thumbnail.title}
          </Text>
          <Text
            style={subtitleStyle}
            ellipsizeMode={'tail'}
            numberOfLines={1}
          >
            {thumbnail.subtitle}
          </Text>
        </View>
      );
    }

    return <View style={{ height: 40 }} />;
  }

  render() {
    const { thumbnail, width } = this.props;
    const {
      containerStyle,
      imageStyle,
      bookmarkStyle,
    } = styles;

    return (
      <View key={thumbnail.name} style={[containerStyle, { width }]} >
        <TouchableWithoutFeedback onPress={() => this.handlePress(thumbnail.id)}>
          <Image style={[imageStyle, { width, height: width }]} source={thumbnail.thumbnailImage} />
        </TouchableWithoutFeedback>
        <Bookmark style={bookmarkStyle} id={thumbnail.id} />
        {this.renderTitle()}
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { selectedMarkerId } = state;
  const active = selectedMarkerId === ownProps.thumbnail.id;

  return { active };
};

PhotoMapCarouselThumbnail.propTypes = propTypes;
PhotoMapCarouselThumbnail.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(PhotoMapCarouselThumbnail);

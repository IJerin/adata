// src/components/guideViewer/index.js

import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../actions/';
import styles from './styles';

const propTypes = {
  currentGuide: PropTypes.object.isRequired,
};

class GuideViewer extends Component {
  handlePress() {
    console.info(this.props.currentGuide);
  }

  render() {
    const { image } = this.props.currentGuide;
    const {
      imagePositionStyle,
      imageStyle,
    } = styles;

    return (
      <View style={imagePositionStyle}>
        <TouchableOpacity style={imageStyle} onPress={() => this.handlePress()}>
          <Image style={imageStyle} source={image} />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { guides, selectedGuideId } = state;

  const currentGuide = guides.find(guide => guide.id === selectedGuideId);

  return { currentGuide };
};

GuideViewer.propTypes = propTypes;

export default connect(mapStateToProps, actions)(GuideViewer);

// src/components/grids/thumbnails/guideGridThumbnail/index.js

import React, { Component } from 'react';
import { View, Image, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import UtilFunctions from '../../../../util/UtilFunctions';
import * as actions from '../../../../actions/';
import styles from './styles';

const propTypes = {
  selectGuide: PropTypes.func.isRequired,
  guide: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  hideAuthor: PropTypes.bool,
  style: PropTypes.any,
};

const defaultProps = {
  hideAuthor: false,
  style: {},
};

class GuideGridThumbnail extends Component {
  handlePress() {
    const { id } = this.props.guide;

    this.props.selectGuide(id);
    Actions.guideDetailGrid();
  }

  renderAuthor() {
    const { guide, hideAuthor } = this.props;
    const {
      userContainerStyle,
      userImageStyle,
      userTextStyle,
    } = styles;

    if (!hideAuthor) {
      return (
        <View style={userContainerStyle}>
          <Image style={userImageStyle} source={guide.author.image} />
          <Text style={userTextStyle}>{guide.author.title}</Text>
        </View>
      );
    }

    return <View />;
  }

  render() {
    const { guide, width, height, style } = this.props;
    const {
      thumbnailStyle,
      containerStyle,
      guideTitleTextStyle,
      guideLocationTextStyle,
    } = styles;

    return (
      <TouchableHighlight
        onPress={() => this.handlePress()}
        underlayColor={'rgba(0,0,0,0)'}
        style={containerStyle}
      >
        <View style={style}>
          {this.renderAuthor()}
          <Image
            style={[thumbnailStyle, { height, width }]}
            source={guide.image}
          />
          <Text style={guideTitleTextStyle}>{guide.title}</Text>
          <Text style={guideLocationTextStyle}>{UtilFunctions.printLocation(guide.location, true)}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

GuideGridThumbnail.propTypes = propTypes;
GuideGridThumbnail.defaultProps = defaultProps;

export default connect(null, actions)(GuideGridThumbnail);

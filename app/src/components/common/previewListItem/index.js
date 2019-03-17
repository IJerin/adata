// src/components/common/previewListItem/index.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';

const propTypes = {
  item: PropTypes.object.isRequired,
  itemWidth: PropTypes.number.isRequired,
  aspectRatio: PropTypes.number,
  pressAction: PropTypes.object,
  rounded: PropTypes.bool,
  style: PropTypes.any,
};

const defaultProps = {
  aspectRatio: 1.0,
  pressAction: null,
  rounded: false,
  style: {},
};


class PreviewListItem extends Component {
  renderAction() {
    const { pressAction } = this.props;
    const { previewSecondColumnContainerStyle, markerIconStyle } = styles;

    if (pressAction) {
      return (
        <View style={previewSecondColumnContainerStyle}>
          <TouchableOpacity onPress={() => pressAction.action()}>
            <Image
              style={markerIconStyle}
              source={pressAction.icon}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return <View />;
  }

  render() {
    const {
      item,
      itemWidth,
      aspectRatio,
      rounded,
      style,
    } = this.props;

    const {
      previewContainerStyle,
      previewFirstColumnContainerStyle,
      previewInnerContainerStyle,
      previewTitleStyle,
      previewSubtitleStyle,
    } = styles;

    let imageStyle = { width: itemWidth, height: itemWidth / aspectRatio, borderRadius: 2 };

    if (rounded) {
      imageStyle = [imageStyle, { borderRadius: itemWidth / 2 }];
    }

    return (
      <View style={[previewContainerStyle, style]}>
        <View style={previewFirstColumnContainerStyle}>
          <Image style={imageStyle} source={item.image} />
          <View style={previewInnerContainerStyle}>
            <Text style={previewTitleStyle}>{item.title}</Text>
            <Text style={previewSubtitleStyle}>{item.subtitle}</Text>
          </View>
        </View>
        {this.renderAction()}
      </View>
    );
  }
}


PreviewListItem.propTypes = propTypes;
PreviewListItem.defaultProps = defaultProps;

export { PreviewListItem };

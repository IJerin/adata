// src/components/common/tag/index.js

import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  text: PropTypes.string,
  id: PropTypes.number,
  image: PropTypes.number,
  canActivate: PropTypes.bool,
  value: PropTypes.number,
  style: PropTypes.any,
};

const defaultProps = {
  id: 1,
  value: 0,
  image: 0,
  text: '',
  canActivate: false,
  style: '',
};

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: this.props.backgroundColor,
      textColor: this.props.textColor,

    };
  }

  handlePress() {
    const { backgroundColor, textColor } = this.state;
    const color = backgroundColor;
    let { value, id } = this.props;
    if (value === 0) {
      value = id;
    }
    if (value !== 0) {
      value = 0;
    }
    this.setState({
      backgroundColor: textColor,
      textColor: color,
    });
    this.renderItems();
  }

  renderItems() {
    const { text, image, canActivate } = this.props;
    const { backgroundColor, textColor } = this.state;
    const { containerStyle, textStyle, imageStyle } = styles;

    if (!image) {
      if (canActivate) {
        return (
          <TouchableOpacity onPress={() => { this.handlePress(); }}>
            <View style={[containerStyle, { backgroundColor, borderColor: textColor }]}>
              <Text style={[textStyle, { color: textColor }]}> {text} </Text>
            </View>
          </TouchableOpacity>
        );
      }

      return (
        <View style={[containerStyle, { backgroundColor, borderColor: backgroundColor }]}>
          <Text style={[textStyle, { color: textColor }]}> {text} </Text>
        </View>
      );
    }
    return (
      <View style={[containerStyle, { backgroundColor, borderColor: backgroundColor }]}>
        <Image style={imageStyle} source={image} />
        <Text style={[textStyle, { color: textColor }]}> {text} </Text>
      </View>
    );
  }


  render() {
    const { style } = this.props;
    return (
      <View style={style}>
        {this.renderItems()}
      </View>
    );
  }
}

Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

export { Tag };

// src/components/headerText/index.js

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  title: PropTypes.string,
  showImage: PropTypes.bool,
};

const defaultProps = {
  title: undefined,
  showImage: false,
};

class HeaderText extends Component {
  renderText() {
    const { title, showImage } = this.props;
    const { logoStyle, titleStyle } = styles;

    if (showImage) {
      const logoSrc = require('./img/logo-viewfinder.png');

      return <Image style={logoStyle} source={logoSrc} />;
    }

    return (
      <View>
        <Text style={titleStyle}>{title}</Text>
      </View>
    );
  }

  render() {
    const { containerStyle } = styles;

    return (
      <View style={containerStyle}>
        {this.renderText()}
      </View>
    );
  }
}

HeaderText.propTypes = propTypes;
HeaderText.defaultProps = defaultProps;

export default HeaderText;

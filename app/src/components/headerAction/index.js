// src/components/headerAction/index.js

import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  allowBack: PropTypes.bool,
  color: PropTypes.bool,
  right: PropTypes.bool,
};

const defaultProps = {
  allowBack: false,
  color: false,
  right: false,
};

class HeaderAction extends Component {
  handlePress() {
    const { allowBack } = this.props;

    if (allowBack) {
      Actions.pop();
    } else {
      Actions.menu();
    }
  }

  renderIcon() {
    const { allowBack, color, right } = this.props;
    const {
      iconContainerStyle,
      iconLeftStyle,
      iconRightStyle,
      iconStyle,
    } = styles;

    let iconSrc = require('./img/icon-menu.png');

    if (allowBack) {
      if (color) {
        iconSrc = require('./img/icon-arrow-back.png');
      } else {
        iconSrc = require('./img/icon-arrow-back-white.png');
      }
    } else if (!color) {
      iconSrc = require('./img/icon-menu-white.png');
    }

    const combinedContainerStyle = right ? [iconContainerStyle, iconRightStyle] : [iconContainerStyle, iconLeftStyle];

    return (
      <TouchableWithoutFeedback onPress={() => this.handlePress()}>
        <View style={combinedContainerStyle}>
          <Image style={iconStyle} source={iconSrc} />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { right } = this.props;
    const { containerStyle } = styles;

    if (right) {
      return (
        <View style={containerStyle}>
          <View style={{ flex: 3, height: 32 }} />
          <View style={{ flex: 1 }}>
            {this.renderIcon()}
          </View>
        </View>
      );
    }

    return (
      <View style={containerStyle}>
        <View style={{ flex: 1 }}>
          {this.renderIcon()}
        </View>
        <View style={{ flex: 3, height: 32 }} />
      </View>
    );
  }
}

HeaderAction.propTypes = propTypes;
HeaderAction.defaultProps = defaultProps;

export default HeaderAction;

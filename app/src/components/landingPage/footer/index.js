// src/components/landingPage/footer/index.js

import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../../actions/';
import styles from './styles';

const propTypes = {
  landingPageView: PropTypes.string.isRequired,
  showHome: PropTypes.func.isRequired,
  showWorld: PropTypes.func.isRequired,
  showBookmark: PropTypes.func.isRequired,
  showProfile: PropTypes.func.isRequired,
};

class Footer extends Component {
  handlePress(view) {
    switch (view) {
      case 'home':
        this.props.showHome();
        break;
      case 'world':
        this.props.showWorld();
        break;
      case 'bookmark':
        this.props.showBookmark();
        break;
      case 'profile':
        this.props.showProfile();
        break;
      default:
        break;
    }
  }

  renderIcon(view) {
    const { landingPageView } = this.props;
    const { iconContainerStyle, iconStyle } = styles;
    let image = 0;

    switch (view) {
      case 'home':
        if (landingPageView === view) {
          image = require('./img/home-icon-selected.png');
        } else {
          image = require('./img/home-icon.png');
        }
        break;
      case 'world':
        if (landingPageView === view) {
          image = require('./img/world-icon-selected.png');
        } else {
          image = require('./img/world-icon.png');
        }
        break;
      case 'bookmark':
      default:
        if (landingPageView === view) {
          image = require('./img/bookmark-icon-selected.png');
        } else {
          image = require('./img/bookmark-icon.png');
        }
        break;
      // case 'profile':
      //   if (landingPageView === view) {
      //     image = require('./img/profile-icon-selected.png');
      //   } else {
      //     image = require('./img/profile-icon.png');
      //   }
      //   break;
    }

    return (
      <View style={iconContainerStyle}>
        <TouchableOpacity onPress={() => { this.handlePress(view); }}>
          <Image style={iconStyle} source={image} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { containerStyle } = styles;

    return (
      <View style={containerStyle}>
        { this.renderIcon('home') }
        { this.renderIcon('world') }
        { this.renderIcon('bookmark') }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { landingPageView } = state;

  return { landingPageView };
};

Footer.propTypes = propTypes;

export default connect(mapStateToProps, actions)(Footer);

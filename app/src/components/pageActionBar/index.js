// src/components/pageActionBar/index.js

import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../actions/';
import styles from './styles';

const propTypes = {
  mapView: PropTypes.bool.isRequired,
  showGrid: PropTypes.func.isRequired,
  showMap: PropTypes.func.isRequired,
  currentGuide: PropTypes.object.isRequired,
};

class PageActionBar extends Component {
  handlePress() {
    const { mapView } = this.props;

    if (mapView) {
      this.props.showGrid();
    } else {
      this.props.showMap();
    }
  }

  renderIcon() {
    const { mapView } = this.props;
    const { iconStyle } = styles;
    const iconSrc = mapView ? require('./img/icon-grid.png') : require('./img/icon-map.png');

    return <Image style={iconStyle} source={iconSrc} />;
  }

  render() {
    const {
      currentGuide,
    } = this.props;

    const {
      containerStyle,
      inputStyle,
      iconContainerStyle,
    } = styles;

    return (
      <View style={containerStyle}>
        <Text style={inputStyle}>{currentGuide.location}</Text>
        <TouchableWithoutFeedback onPress={() => this.handlePress()}>
          <View style={iconContainerStyle}>
            {this.renderIcon()}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { guides, contentView, selectedGuideId } = state;

  const currentGuide = guides.find(guide => guide.id === selectedGuideId);

  return {
    mapView: contentView === 'map',
    currentGuide,
  };
};

PageActionBar.propTypes = propTypes;

export default connect(mapStateToProps, actions)(PageActionBar);

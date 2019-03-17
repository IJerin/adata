// src/components/photoZoomView/index.js

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Image from 'react-native-transformable-image';
import PropTypes from 'prop-types';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import Header from '../header/';
import * as actions from '../../actions/';
import styles from './styles';

const propTypes = {
  location: PropTypes.object.isRequired,
};

class PhotoZoomView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
    };
  }
  componentWillMount() {
    const { location } = this.props;
    const imageDimensions = resolveAssetSource(location.image);
    this.setState({
      height: imageDimensions.height,
      width: imageDimensions.width,
    });
  }
  handlePress() {
    Actions.photoDetail();
  }

  render() {
    const { location } = this.props;
    const {
      containerStyle,
      imageContainerStyle,
      imageStyle,
    } = styles;
    return (
      <View style={containerStyle}>
        <Header allowBack />
        <View style={imageContainerStyle}>
          <Image
            style={imageStyle}
            source={location.image}
            pixels={{ width: this.state.width, height: this.state.width }}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const { guides, selectedGuideId, selectedMarkerId } = state;

  const guide = guides.find(g => g.id === selectedGuideId);
  const location = guide.markers.find(m => m.id === selectedMarkerId);

  return { guideId: selectedGuideId, location };
};

PhotoZoomView.propTypes = propTypes;

export default connect(mapStateToProps, actions)(PhotoZoomView);

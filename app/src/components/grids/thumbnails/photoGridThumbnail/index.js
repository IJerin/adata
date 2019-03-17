// src/components/grids/thumbnails/gridThumbnail/index.js

import React, { Component } from 'react';
import { View, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import { Modal } from '../../../common/';
import * as actions from '../../../../actions/';
import styles from './styles';

const propTypes = {
  selectMarker: PropTypes.func.isRequired,
  thumbnail: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

class PhotoGridThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonPressed: false,
    };
  }

  componentWillMount() {
    this.setState({ buttonPressed: false });
  }

  handlePress() {
    const { id } = this.props.thumbnail;

    // Set the state to show the modal
    this.setState({ buttonPressed: true });

    setTimeout(() => {
      this.setState({ buttonPressed: false });
    }, 500);

    this.props.selectMarker(id);
    Actions.photoDetail();
  }

  render() {
    const { thumbnail, width, height, style } = this.props;
    const { buttonPressed } = this.state;
    const {
      thumbnailStyle,
    } = styles;

    return (
      <View>
        <Modal
          visible={buttonPressed}
        >
          <ActivityIndicator size={'large'} color={'#FFF'} />
        </Modal>
        <TouchableHighlight
          onPress={() => this.handlePress()}
          underlayColor={'rgba(0,0,0,0)'}
        >
          <View style={style}>
            <Image
              style={[thumbnailStyle, { height, width }]}
              source={thumbnail.gridImage}
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

PhotoGridThumbnail.propTypes = propTypes;

export default connect(null, actions)(PhotoGridThumbnail);

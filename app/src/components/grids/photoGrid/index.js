// src/components/grids/photoGrid/index.js

import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PhotoGridThumbnail from '../thumbnails/photoGridThumbnail/';
import { Grid } from '../../common/';

const propTypes = {
  thumbnails: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class PhotoGrid extends Component {
  constructor() {
    super();

    this.windowWidth = Dimensions.get('window').width;
  }

  renderItem(item, itemWidth, aspectRatio, style) {
    return (
      <PhotoGridThumbnail
        thumbnail={item}
        style={style}
        width={itemWidth}
        height={itemWidth / aspectRatio}
      />
    );
  }

  render() {
    return (
      <View>
        <Grid
          data={this.props.thumbnails}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const mapPropsToState = (state) => {
  const { guides, selectedGuideId, selectedMarkerId } = state;

  const currentGuide = guides.find(guide => guide.id === selectedGuideId);

  return { thumbnails: currentGuide.markers, selectedMarkerId };
};

PhotoGrid.propTypes = propTypes;

export default connect(mapPropsToState)(PhotoGrid);

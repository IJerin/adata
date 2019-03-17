// src/components/landingPage/bookmarkView/index.js

import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid } from '../../common/';
import PhotoGridThumbnail from '../../grids/thumbnails/photoGridThumbnail/';
import styles from './styles';

const propTypes = {
  bookmarkedMarkers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class BookmarkView extends Component {
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
    const {
      containerStyle,
    } = styles;
    return (
      <View style={containerStyle}>
        <Grid
          data={this.props.bookmarkedMarkers}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { bookmarks, guides } = state;
  const bookmarkedMarkers = guides[0].markers.filter(marker => bookmarks.includes(marker.id));

  return { bookmarkedMarkers };
};

BookmarkView.propTypes = propTypes;

export default connect(mapStateToProps)(BookmarkView);

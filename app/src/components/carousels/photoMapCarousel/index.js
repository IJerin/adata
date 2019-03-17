// src/components/carousels/photoMapCarousel/index.js

import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import SnapCarousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';

import * as actions from '../../../actions/';
import PhotoMapCarouselThumbnail from '../thumbnails/photoMapCarouselThumbnail/';
import styles from './styles';

const propTypes = {
  selectMarker: PropTypes.func.isRequired,
  clickMarker: PropTypes.func.isRequired,
  selectedThumbnailId: PropTypes.number.isRequired,
  markerClicked: PropTypes.bool.isRequired,
  thumbnails: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class PhotoMapCarousel extends Component {
  constructor() {
    super();

    this._carousel = null;
    this.screenWidth = Dimensions.get('window').width;
    this.itemWidth = 180 + 12;

    this.scrolled = false;
  }

  componentDidUpdate(prevProps) {
    const { selectedThumbnailId } = this.props;

    // Ignore other state updates unless a new photo marker was clicked on the map
    if (prevProps.selectedThumbnailId !== selectedThumbnailId) {
      // Get the index of the item in the thumbnails array
      const newIndex = this.getThumbnailIndex(selectedThumbnailId);

      // Move the carousel to select the new photo
      this._carousel.snapToItem(newIndex, true);
    }
  }

  onSnapToItem(slideIdx) {
    const { markerClicked } = this.props;

    // If the snap wasn't triggered by a marker click
    if (!markerClicked) {
      this.props.selectMarker(this.props.thumbnails[slideIdx].id);
    } else {
      this.props.clickMarker(false);
    }
  }

  getThumbnailIndex(thumbnailId) {
    return this.props.thumbnails.findIndex(thumbnail => thumbnail.id === thumbnailId);
  }

  renderItem(itemObj) {
    return <PhotoMapCarouselThumbnail thumbnail={itemObj.item} width={this.itemWidth - 12} />;
  }

  render() {
    const { selectedThumbnailId } = this.props;
    const { containerStyle } = styles;
    const startingIdx = this.getThumbnailIndex(selectedThumbnailId);

    return (
      <View style={containerStyle}>
        <SnapCarousel
          ref={(c) => { this._carousel = c; }}
          data={this.props.thumbnails}
          renderItem={(item, width) => this.renderItem(item, width)}
          sliderWidth={this.screenWidth}
          itemWidth={this.itemWidth}
          firstItem={startingIdx}
          inactiveSlideScale={0.88}
          inactiveSlideOpacity={0.8}
          enableMomentum
          onSnapToItem={slideIdx => this.onSnapToItem(slideIdx)}
          activeAnimationType={'spring'}
        />
      </View>
    );
  }
}

const mapPropsToState = (state) => {
  const { guides, selectedGuideId, selectedMarkerId, markerClicked } = state;

  const currentGuide = guides.find(guide => guide.id === selectedGuideId);

  return {
    thumbnails: currentGuide.markers,
    selectedThumbnailId: selectedMarkerId,
    markerClicked,
  };
};

PhotoMapCarousel.propTypes = propTypes;

export default connect(mapPropsToState, actions)(PhotoMapCarousel);

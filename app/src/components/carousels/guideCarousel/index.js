// src/components/carousels/guideCarousel/index.js

import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../../actions/';
import { Carousel } from '../../common/';
import GuideCarouselThumbnail from '../thumbnails/guideCarouselThumbnail';
import styles from './styles';

const propTypes = {
  selectGuide: PropTypes.func.isRequired,
  guides: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class GuideCarousel extends Component {
  constructor() {
    super();

    this._carousel = null;
    this.screenWidth = Dimensions.get('window').width;
    this.itemWidth = Math.round(this.screenWidth / 2) - 30;
  }

  handlePress(item) {
    const { id } = item;
    this._carousel.snapToItem(item.id - 1, true);

    this.props.selectGuide(id);
  }

  renderItem(carousel, item, itemWidth, aspectRatio, style) {
    return (
      <GuideCarouselThumbnail
        carousel={carousel}
        guide={item}
        width={itemWidth}
        height={itemWidth / aspectRatio}
        style={style}
      />
    );
  }

  render() {
    const { guides } = this.props;

    const { containerStyle } = styles;

    return (
      <View style={containerStyle}>
        <Carousel
          data={guides}
          renderItem={this.renderItem}
          itemWidth={this.itemWidth}
          activeSlideAlignment={'start'}
          aspectRatio={1.6}
          inactiveSlideScale={1.0}
          inactiveSlideOpacity={1.0}
        />
      </View>
    );
  }
}


GuideCarousel.propTypes = propTypes;

export default connect(null, actions)(GuideCarousel);

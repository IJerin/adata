// src/components/carousels/guideMapCarousel/index.js

import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GuideMapCarouselThumbnail from '../thumbnails/guideMapCarouselThumbnail/';
import { Carousel } from '../../common/';

const propTypes = {
  guides: PropTypes.arrayOf(PropTypes.object).isRequired,
};


class GuideMapCarousel extends Component {
  constructor() {
    super();

    this.itemWidth = Dimensions.get('window').width - 84;
  }

  renderItem(carousel, item, itemWidth, aspectRatio, style) {
    return (
      <GuideMapCarouselThumbnail
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

    return (
      <View>
        <Carousel
          data={guides}
          renderItem={this.renderItem}
          itemWidth={this.itemWidth}
          activeSlideAlignment={'center'}
          aspectRatio={1.6}
          inactiveSlideScale={1.0}
          inactiveSlideOpacity={1.0}
        />
      </View>
    );
  }
}

const mapPropsToState = (state) => {
  const { guides } = state;

  return { guides };
};

GuideMapCarousel.propTypes = propTypes;

export default connect(mapPropsToState)(GuideMapCarousel);

// src/components/common/carousel/index.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import SnapCarousel from 'react-native-snap-carousel';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemWidth: PropTypes.number.isRequired,
  aspectRatio: PropTypes.number.isRequired,
  renderItem: PropTypes.func.isRequired,
  startingIndex: PropTypes.number,
  // disableSnap: PropTypes.bool,
  singleItemScroll: PropTypes.bool,
  loop: PropTypes.bool,
  itemMargin: PropTypes.number,
  activeSlideAlignment: PropTypes.string,
  inactiveSlideScale: PropTypes.number,
  inactiveSlideOpacity: PropTypes.number,
  onSnapToItem: PropTypes.func,
  autoplay: PropTypes.bool,
  autoplayDelay: PropTypes.number,
  slideStyle: PropTypes.any,
  style: PropTypes.any,
};

const defaultProps = {
  startingIndex: 0,
  disableSnap: false,
  singleItemScroll: false,
  loop: false,
  itemMargin: 12,
  activeSlideAlignment: 'start',
  inactiveSlideScale: 1.0,
  inactiveSlideOpacity: 1.0,
  autoplay: false,
  autoplayDelay: 5000,
  onSnapToItem: () => {},
  style: {},
  slideStyle: {},
};


class Carousel extends Component {
  constructor(props) {
    super(props);
    this._carousel = null;
    this.screenWidth = Dimensions.get('window').width;
  }

  onSnapToItem(slideIdx) {
    const { onSnapToItem } = this.props;

    // Call the passed in function
    onSnapToItem(this._carousel, slideIdx);
  }

  renderItem(itemObj) {
    const { itemWidth, itemMargin, aspectRatio, renderItem } = this.props;
    const { item, index } = itemObj;

    const marginLeft = index === 0 ? 0 : itemMargin;

    const style = { marginLeft, width: itemWidth };

    // Call the passed in function
    return renderItem(this._carousel, item, itemWidth, aspectRatio, style);
  }

  render() {
    const {
      data,
      itemWidth,
      startingIndex,
      // disableSnap,
      singleItemScroll,
      itemMargin,
      activeSlideAlignment,
      inactiveSlideScale,
      inactiveSlideOpacity,
      autoplay,
      autoplayDelay,
      loop,
      style,
      slideStyle,
    } = this.props;

    return (
      <SnapCarousel
        style={style}
        ref={(c) => { this._carousel = c; }}
        data={data}
        renderItem={itemObj => this.renderItem(itemObj)}
        sliderWidth={this.screenWidth}
        itemWidth={itemWidth + itemMargin}
        enableMomentum={!singleItemScroll}
        // enableSnap={!disableSnap} // I won't work until RN 0.48
        activeSlideAlignment={activeSlideAlignment}
        activeAnimationOptions={null}
        firstItem={startingIndex}
        inactiveSlideScale={inactiveSlideScale}
        inactiveSlideOpacity={inactiveSlideOpacity}
        onSnapToItem={slideIdx => this.onSnapToItem(slideIdx)}
        activeAnimationType={'spring'}
        autoplay={autoplay}
        autoplayDelay={autoplayDelay}
        loop={loop}
        useScrollView
        slideStyle={slideStyle}
      />
    );
  }
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

export { Carousel };

// src/components/landingPage/homeView/index.js

import React, { Component } from 'react';
import { View, Text, Image, Dimensions, Platform } from 'react-native';

import I18n from '../../../util/i18n';
import { Carousel, Card } from '../../common/';
import GuideGrid from '../../grids/guideGrid/';
import styles from './styles';

const dataset1 = [
  { id: 1, name: 'Item 1', image: require('./img/biggerGray.png') },
  { id: 2, name: 'Item 2', image: require('./img/yellow.png') },
  { id: 3, name: 'Item 3', image: require('./img/biggerGray.png') },
  { id: 4, name: 'Item 4', image: require('./img/yellow.png') },
];

const itemWidth = Dimensions.get('window').width - 124;

class HomeView extends Component {
  constructor() {
    super();

    this.state = {
      selectedIdx: 0,
    };
  }

  onSnapToItem(carousel, slideIdx) {
    this.setState({ selectedIdx: slideIdx });
  }

  renderItem(carousel, item, width, aspectRatio, style) {
    const { selectedIdx } = this.state;
    const { id, image } = item;
    const { slideShadowStyle } = styles;

    // TODO: Make this more robust; id - 1 works for now
    return (
      <View key={id} style={selectedIdx === (id - 1) ? [style, slideShadowStyle] : style}>
        <Image style={{ borderRadius: 4, width, height: width / aspectRatio }} source={image} />
      </View>
    );
  }

  render() {
    const {
      photoContainerStyle,
      headerStyle,
      slideStyle,
    } = styles;

    return (
      <View>
        <Carousel
          slideStyle={slideStyle}
          data={dataset1}
          itemWidth={itemWidth}
          aspectRatio={0.625}
          itemMargin={Platform.OS === 'ios' ? 8 : 12}
          activeSlideAlignment={'center'}
          inactiveSlideOpacity={0.8}
          inactiveSlideScale={Platform.OS === 'ios' ? 0.95 : 1.0}
          renderItem={(c, i, w, a, s) => this.renderItem(c, i, w, a, s)}
          onSnapToItem={(c, i) => this.onSnapToItem(c, i)}
          autoplay
          autoplayDelay={0}
          loop
        />
        <Card>
          <View style={photoContainerStyle}>
            <Text style={headerStyle}>{I18n.t('landingPage.feature')}</Text>
          </View>
          <GuideGrid />
        </Card>
      </View>
    );
  }
}

export default HomeView;

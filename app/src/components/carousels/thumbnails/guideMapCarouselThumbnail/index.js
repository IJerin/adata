// src/components/carousels/thumbnails/guideMapCarouselThumbnail/index.js

import React from 'react';
import { View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

import { Tag } from '../../../common/';
import UtilFunctions from '../../../../util/UtilFunctions';
import styles from './styles';

const propTypes = {
  guide: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.any,
};

const defaultProps = {
  style: {},
};

const GuideMapCarouselThumbnail = (props) => {
  const { guide, width, height, style } = props;
  const {
    thumbnailStyle,
    guideTitleTextStyle,
    guideLocationTextStyle,
  } = styles;

  return (
    <View style={style}>
      <Image
        style={[thumbnailStyle, { height, width }]}
        source={guide.image}
      />
      <View style={{ position: 'absolute', bottom: 40, left: 8 }}>
        <Tag
          backgroundColor={'rgba(0, 0, 0, 1)'}
          textColor={'rgba(255, 255, 255, 1)'}
          text={guide.author.title}
          image={guide.author.image}
        />
      </View>
      <Text style={guideTitleTextStyle}>{guide.title}</Text>
      <Text style={guideLocationTextStyle}>{UtilFunctions.printLocation(guide.location, true)}</Text>
    </View>
  );
};


GuideMapCarouselThumbnail.propTypes = propTypes;
GuideMapCarouselThumbnail.defaultProps = defaultProps;

export default GuideMapCarouselThumbnail;

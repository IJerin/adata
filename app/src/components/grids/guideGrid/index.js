// src/components/grids/guideGrid/index.js

import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GuideGridThumbnail from '../thumbnails/guideGridThumbnail/';
import { Grid } from '../../common/';

const propTypes = {
  guides: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class GuideGrid extends Component {
  constructor() {
    super();

    this.windowWidth = Dimensions.get('window').width;
  }

  renderItem(item, itemWidth, aspectRatio, style) {
    style.marginBottom = 24;

    return (
      <GuideGridThumbnail
        guide={item}
        style={style}
        width={itemWidth}
        height={itemWidth / aspectRatio}
      />
    );
  }

  render() {
    const { guides } = this.props;

    return (
      <View>
        <Grid
          data={guides}
          renderItem={this.renderItem}
          numItems={2}
          aspectRatio={1.6}
        />
      </View>
    );
  }
}

const mapPropsToState = (state) => {
  const { guides } = state;

  return { guides };
};

GuideGrid.propTypes = propTypes;

export default connect(mapPropsToState)(GuideGrid);

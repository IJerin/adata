// src/components/common/grid/index.js

import React, { Component } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderItem: PropTypes.func.isRequired,
  numItems: PropTypes.number,
  itemMargin: PropTypes.number,
  aspectRatio: PropTypes.number,
};
const defaultProps = {
  numItems: 3,
  itemMargin: 12,
  aspectRatio: 1,
};


class Grid extends Component {
  constructor(props) {
    super(props);


    const windowWidth = Dimensions.get('window').width;
    const gridMargin = 48;
    const innerItemMargins = (this.props.numItems - 1) * this.props.itemMargin;

    this.itemWidth = ((windowWidth - gridMargin - innerItemMargins) / this.props.numItems);
  }

  renderItem(itemObj) {
    const { renderItem, itemMargin, aspectRatio, numItems } = this.props;
    const { id } = itemObj;
    const marginLeft = (id - 1) % numItems === 0 ? 0 : itemMargin;

    const style = { marginLeft, marginBottom: itemMargin };

    // Call the passed in function
    return renderItem(itemObj, this.itemWidth, aspectRatio, style);
  }


  render() {
    const {
      data,
    } = this.props;

    return (
      <View>
        <FlatList
          contentContainerStyle={styles.listViewStyle}
          data={data}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={itemObj => this.renderItem(itemObj.item)}
        />
      </View>
    );
  }
}


Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export { Grid };

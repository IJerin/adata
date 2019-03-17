// src/components/bookmark/index.js

import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../actions/';
import styles from './styles';

const propTypes = {
  id: PropTypes.number.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
  addBookmark: PropTypes.func.isRequired,
  removeBookmark: PropTypes.func.isRequired,
  style: PropTypes.any,
};

const defaultProps = {
  style: {},
};

class Bookmark extends Component {
  handlePress() {
    const { id, isBookmarked, addBookmark, removeBookmark } = this.props;

    if (isBookmarked) {
      removeBookmark(id);
    } else {
      addBookmark(id);
    }
  }

  renderIcon() {
    const { isBookmarked } = this.props;
    const { imageStyle } = styles;
    let image = require('./img/bookmark-empty.png');

    if (isBookmarked) {
      image = require('./img/bookmark-selected.png');
    }

    return <Image style={imageStyle} source={image} />;
  }

  render() {
    const { style } = this.props;
    const { containerStyle } = styles;

    return (
      <TouchableOpacity style={[containerStyle, style]} onPress={() => this.handlePress()}>
        { this.renderIcon() }
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { bookmarks } = state;

  const isBookmarked = bookmarks.includes(ownProps.id);

  return { isBookmarked };
};

Bookmark.propTypes = propTypes;
Bookmark.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(Bookmark);

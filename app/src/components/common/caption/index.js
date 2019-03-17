// src/components/common/caption/index.js

import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  children: PropTypes.any.isRequired,
  color: PropTypes.string,
  title: PropTypes.bool,
  error: PropTypes.bool,
  style: PropTypes.any,
};

const defaultProps = {
  color: '', // Not ideal, but need to be different based on flags
  title: false,
  error: false,
  style: {},
};

const Caption = (props) => {
  const { children, title, error, style } = props;
  const { baseStyle } = styles;

  let { color } = props;

  let fontWeight = '400';

  if (title) {
    fontWeight = '600';
  }

  // If no default color is passed in
  if (color === '') {
    if (title) {
      color = '#333';
    } else if (error) {
      color = '#DC584F';
    } else {
      color = '#767676';
    }
  }

  const captionStyle = [baseStyle, { fontWeight }];

  return (
    <Text style={[captionStyle, { color }, style]}>{children}</Text>
  );
};

Caption.propTypes = propTypes;
Caption.defaultProps = defaultProps;

export { Caption };

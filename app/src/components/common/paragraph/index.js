// src/components/common/paragraph/index.js

import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  children: PropTypes.any.isRequired,
  color: PropTypes.string,
  style: PropTypes.any,
};

const defaultProps = {
  color: '#595959',
  style: {},
};

const Paragraph = (props) => {
  const { children, color, style } = props;
  const { pStyle } = styles;

  return (
    <Text style={[pStyle, { color }, style]}>{children}</Text>
  );
};

Paragraph.propTypes = propTypes;
Paragraph.defaultProps = defaultProps;

export { Paragraph };

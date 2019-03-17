// src/components/common/title/index.js

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
  color: '#333',
  style: {},
};

const Title = (props) => {
  const { children, color, style } = props;
  const { titleStyle } = styles;

  return (
    <Text style={[titleStyle, { color }, style]}>{children}</Text>
  );
};

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export { Title };

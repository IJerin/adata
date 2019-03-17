// src/components/common/label/index.js

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

const Label = (props) => {
  const { children, color, style } = props;
  const { labelStyle } = styles;

  return (
    <Text style={[labelStyle, { color }, style]}>{children}</Text>
  );
};

Label.propTypes = propTypes;
Label.defaultProps = defaultProps;

export { Label };

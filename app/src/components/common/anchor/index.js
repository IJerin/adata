// src/components/common/anchor/index.js

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  children: PropTypes.any.isRequired,
  onPress: PropTypes.func,
  color: PropTypes.string,
  style: PropTypes.any,
};

const defaultProps = {
  onPress: () => {},
  color: '#1BAC95',
  style: {},
};

const Anchor = (props) => {
  const { children, onPress, color, style } = props;
  const { aStyle } = styles;

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <Text style={[aStyle, { color }, style]}>{children}</Text>
    </TouchableOpacity>
  );
};

Anchor.propTypes = propTypes;
Anchor.defaultProps = defaultProps;

export { Anchor };

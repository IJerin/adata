// src/components/common/card/index.js

import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  children: PropTypes.any.isRequired,
};

const Card = (props) => {
  const { children } = props;
  const { containerStyle } = styles;

  return (
    <View style={containerStyle}>
      {children}
    </View>
  );
};

Card.propTypes = propTypes;

export { Card };

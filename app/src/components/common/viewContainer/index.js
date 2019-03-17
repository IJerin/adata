// src/components/common/viewContainer/index.js

import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  children: PropTypes.any.isRequired,
};

const ViewContainer = (props) => {
  const { containerStyle } = styles;
  const { children } = props;

  return (
    <View style={containerStyle}>
      {children}
    </View>
  );
};

ViewContainer.propTypes = propTypes;

export { ViewContainer };

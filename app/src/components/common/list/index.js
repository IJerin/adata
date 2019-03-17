// src/components/common/listItem/index.js

import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  style: PropTypes.object,
};

const defaultProps = {
  style: undefined,
};

const List = (props) => {
  const { children, style } = props;
  const { containerStyle } = styles;

  return (
    <View style={style ? [containerStyle, style] : containerStyle}>
      {children}
    </View>
  );
};

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export { List };

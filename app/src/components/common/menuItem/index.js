// src/components/common/menuItem/index.js

import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  children: PropTypes.string.isRequired,
  style: PropTypes.number,
  ellipsize: PropTypes.bool,
};

const defaultProps = {
  style: 0,
  ellipsize: false,
};

const MenuItem = (props) => {
  const { children, style, ellipsize } = props;
  const { textStyle } = styles;

  return (
    <View style={style}>
      <Text
        style={textStyle}
        ellipsize={ellipsize}
      >
        {children}
      </Text>
    </View>
  );
};

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

export { MenuItem };

// src/components/common/sectionTitle/index.js

import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  children: PropTypes.string.isRequired,
  style: PropTypes.number,
};

const defaultProps = {
  style: 0,
};

const SectionTitle = (props) => {
  const { children, style } = props;
  const { textStyle } = styles;

  return (
    <View style={style}>
      <Text style={textStyle}>
        {children}
      </Text>
    </View>
  );
};

SectionTitle.propTypes = propTypes;
SectionTitle.defaultProps = defaultProps;

export { SectionTitle };

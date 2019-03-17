// src/components/common/heading/index.js

import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  children: PropTypes.any.isRequired,
  color: PropTypes.string,
  level: PropTypes.number,
  style: PropTypes.any,
};

const defaultProps = {
  color: '#333',
  level: 1,
  style: {},
};

const Heading = (props) => {
  const { children, color, level, style } = props;
  const {
    h1Style,
    h2Style,
    h3Style,
    h4Style,
    h5Style,
  } = styles;

  // Set h1 style as the default
  let headingStyle = h1Style;

  // TODO: Support more levels?
  switch (level) {
    case 2:
      headingStyle = h2Style;
      break;
    case 3:
      headingStyle = h3Style;
      break;
    case 4:
      headingStyle = h4Style;
      break;
    case 5:
      headingStyle = h5Style;
      break;
    case 1:
    default:
      break;
  }

  return (
    <Text style={[headingStyle, { color }, style]}>{children}</Text>
  );
};

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export { Heading };

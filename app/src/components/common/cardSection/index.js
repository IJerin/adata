// src/components/common/cardSection/index.js

import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  children: PropTypes.any.isRequired,
  hideSeparator: PropTypes.bool,
  separatorMargin: PropTypes.number,
};

const defaultProps = {
  hideSeparator: false,
  separatorMargin: 24,
};

const CardSection = (props) => {
  const { children, hideSeparator, separatorMargin } = props;
  const { containerStyle, separatorStyle } = styles;

  const renderSeperator = () => {
    if (hideSeparator) {
      return <View />;
    }

    return <View style={[separatorStyle, { marginBottom: (separatorMargin - 1) }]} />;
  };

  return (
    <View style={containerStyle}>
      <View style={{ marginBottom: separatorMargin }}>
        {children}
      </View>
      {renderSeperator()}
    </View>
  );
};

CardSection.propTypes = propTypes;
CardSection.defaultProps = defaultProps;

export { CardSection };

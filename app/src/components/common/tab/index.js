// src/components/common/tab/index.js

import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  children: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  selectedTab: PropTypes.string.isRequired,
};

const Tab = (props) => {
  const { children, id, title, selectedTab } = props;
  const { containerStyle } = styles;

  const selected = selectedTab === id;

  if (selected) {
    return (
      <View title={title} style={containerStyle}>
        {children}
      </View>
    );
  }

  return <View />;
};

Tab.propTypes = propTypes;

export { Tab };

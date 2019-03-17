// src/components/searchView/index.js

import React from 'react';
import { View, Text } from 'react-native';

import { ViewContainer } from '../common/';
import Header from '../header/';
import styles from './styles';

const SearchView = () => {
  const { containerStyle, textStyle } = styles;

  return (
    <ViewContainer>
      <Header title="Search" dismissable />
      <View style={containerStyle}>
        <Text style={textStyle}>Hi Im the SearchView</Text>
      </View>
    </ViewContainer>
  );
};

export default SearchView;

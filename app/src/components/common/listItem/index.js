// src/components/common/listItem/index.js

import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  image: PropTypes.number,
  longLabel: PropTypes.bool,
  longValue: PropTypes.bool,
  selected: PropTypes.bool,
};

const defaultProps = {
  image: 0,
  longLabel: false,
  longValue: false,
  selected: false,
};

const ListItem = (props) => {
  const { label, value, image, longLabel, longValue, selected } = props;
  const {
    containerStyle,
    wrapperContainerStyle,
    selectorStyle,
    selectedStyle,
    labelContainerStyle,
    labelTextStyle,
    imageStyle,
    valueContainerStyle,
    valueTextStyle,
  } = styles;

  const renderLabel = () => {
    if (image) {
      return (
        <View style={longLabel ? labelContainerStyle : [labelContainerStyle, { flex: 1 }]}>
          <Image style={imageStyle} source={image} />
          <Text style={labelTextStyle}>{label}</Text>
        </View>
      );
    }

    const combinedStyle = [labelContainerStyle, { marginVertical: 2 }];

    return (
      <View style={longLabel ? combinedStyle : [combinedStyle, { flex: 1 }]}>
        <Text style={labelTextStyle}>{label}</Text>
      </View>
    );
  };

  const renderSelector = () => {
    if (selected) {
      return <View style={selectorStyle} />;
    }

    return <View />;
  };

  return (
    <View style={selected ? [containerStyle, selectedStyle] : containerStyle}>
      {renderSelector()}
      <View style={selected ? [wrapperContainerStyle, { marginLeft: 20, marginRight: 24 }] : wrapperContainerStyle}>
        {renderLabel()}
        <View style={longValue ? [valueContainerStyle, { flex: 2 }] : valueContainerStyle}>
          <Text style={valueTextStyle}>{value}</Text>
        </View>
      </View>
    </View>
  );
};

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export { ListItem };

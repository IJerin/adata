// src/components/common/clickableIcon/index.js

import React from 'react';
import { TouchableHighlight, TouchableWithoutFeedback, View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  style: PropTypes.any,
  onPress: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
};

const defaultProps = {
  style: 0,
};

const ClickableIcon = (props) => {
  const {
    style,
    onPress,
    data,
    selected,
    width,
  } = props;

  const {
    textStyle,
    roundedStyle,
    roundedTextStyle,
  } = styles;

  const isImage = Object.keys(data).length > 1;

  if (isImage) {
    const imageSource = selected ? data.selectedSrc : data.src;
    const text = (data.text && selected) ? data.text : '';

    return (
      <View style={style}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View>
            <Image style={{ width, height: width }} source={imageSource} />
            <Text style={textStyle}>{text}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  const dimensionStyle = { width, height: width, borderRadius: width / 2 };

  let roundedContainerStyle = [style, dimensionStyle, roundedStyle];
  let roundedValueStyle = roundedTextStyle;

  if (selected) {
    roundedContainerStyle = [style, dimensionStyle, roundedStyle, { backgroundColor: '#F5C323', borderColor: '#F5C323' }];
    roundedValueStyle = [roundedTextStyle, { color: '#725B14' }];
  }

  return (
    <TouchableHighlight style={roundedContainerStyle} onPress={onPress}>
      <Text style={roundedValueStyle}>{data.value}</Text>
    </TouchableHighlight>
  );
};

ClickableIcon.propTypes = propTypes;
ClickableIcon.defaultProps = defaultProps;

export { ClickableIcon };

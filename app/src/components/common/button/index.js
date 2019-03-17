// src/components/common/button/index.js

import React from 'react';
import { View, Image, TouchableOpacity, TouchableWithoutFeedback, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

import globalStyles from '../../../styles';
import styles from './styles';

// Gradients
const PRIMARY_GRADIENT = ['#238270', '#1BAC95', '#78CA9C'];
const DESTRUCTIVE_GRADIENT = ['#DC584F', '#DC584F', '#DC584F'];

// Locations
const GRADIENT_LOCATIONS = [0, 0.5, 1.0];

const propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  image: PropTypes.number,
  secondary: PropTypes.bool,
  capitalize: PropTypes.bool,
  disabled: PropTypes.bool,
  inverted: PropTypes.bool,
  destructive: PropTypes.bool,
  fillContainer: PropTypes.bool,
  style: PropTypes.any,
  textStyle: PropTypes.any,
};

const defaultProps = {
  image: 0,
  secondary: false,
  capitalize: false,
  disabled: false,
  inverted: false,
  destructive: false,
  fillContainer: false,
  style: {},
  textStyle: {},
};

const Button = (props) => {
  const {
    onPress,
    children,
    image,
    secondary,
    capitalize,
    disabled,
    inverted,
    destructive,
    fillContainer,
    style,
    textStyle,
  } = props;

  const {
    titleStyle,
  } = globalStyles;

  const {
    baseButtonStyle,
    baseTextStyle,
    imageStyle,
    primaryButtonStyle,
    primaryButtonTextStyle,
    secondaryButtonStyle,
    secondaryButtonTextStyle,
    invertedPrimaryButtonStyle,
    invertedPrimaryButtonTextStyle,
    invertedSecondaryButtonStyle,
    invertedSecondaryButtonTextStyle,
    destructivePrimaryButtonStyle,
    destructivePrimaryButtonTextStyle,
    destructiveSecondaryButtonStyle,
    destructiveSecondaryButtonTextStyle,
    disabledButtonStyle,
    disabledButtonTextStyle,
  } = styles;

  const printContent = (buttonTextStyle) => {
    const text = capitalize ? children.toUpperCase() : children;

    if (image) {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image style={imageStyle} source={image} />
          <Text style={[buttonTextStyle, { marginLeft: 4 }, textStyle]}>{text}</Text>
        </View>
      );
    }

    return (
      <Text style={[buttonTextStyle, textStyle]}>{text}</Text>
    );
  };

  // Set the base
  const buttonStyle = image ? [baseButtonStyle, { paddingVertical: 8 }] : [baseButtonStyle];
  const buttonTextStyle = [titleStyle, baseTextStyle];
  let buttonColors = [];
  let colorLocations = [];

  if (disabled) {
    buttonStyle.push(disabledButtonStyle);
    buttonTextStyle.push(disabledButtonTextStyle);
  } else if (inverted) {
    if (secondary) {
      buttonStyle.push(invertedSecondaryButtonStyle);
      buttonTextStyle.push(invertedSecondaryButtonTextStyle);
    } else {
      buttonStyle.push(invertedPrimaryButtonStyle);
      buttonTextStyle.push(invertedPrimaryButtonTextStyle);
    }
  } else if (destructive) {
    if (secondary) {
      buttonStyle.push(destructiveSecondaryButtonStyle);
      buttonTextStyle.push(destructiveSecondaryButtonTextStyle);
    } else {
      buttonStyle.push(destructivePrimaryButtonStyle);
      buttonTextStyle.push(destructivePrimaryButtonTextStyle);
      buttonColors = DESTRUCTIVE_GRADIENT;
      colorLocations = GRADIENT_LOCATIONS;
    }
  } else if (!disabled && !inverted && !destructive) {
    // Primary
    if (secondary) {
      buttonStyle.push(secondaryButtonStyle);
      buttonTextStyle.push(secondaryButtonTextStyle);
    } else if (!secondary) {
      buttonStyle.push(primaryButtonStyle);
      buttonTextStyle.push(primaryButtonTextStyle);
      buttonColors = PRIMARY_GRADIENT;
      colorLocations = GRADIENT_LOCATIONS;
    }
  }

  // If it should fill the container add a flex to it
  if (fillContainer) {
    buttonStyle.push({ flex: 1 });
  }

  buttonStyle.push(style);

  if (buttonColors.length > 0) {
    return (
      <LinearGradient
        locations={colorLocations}
        colors={buttonColors}
        style={buttonStyle}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity onPress={onPress}>
          {printContent(buttonTextStyle)}
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  // Give no feedback for disabled buttons
  if (disabled) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={buttonStyle}>
          {printContent(buttonTextStyle)}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={buttonStyle}>
        {printContent(buttonTextStyle)}
      </View>
    </TouchableOpacity>
  );

  // return (
  //   <TouchableWithoutFeedback onPress={onPress}>
  //     <LinearGradient locations={colorLocations} colors={buttonColors} style={fillContainer ? [buttonStyle, { flex: 1 }] : buttonStyle} >
  //       <Text style={buttonTextStyle}>
  //         {printText(children)}
  //       </Text>
  //     </LinearGradient>
  //   </TouchableWithoutFeedback>
  // );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export { Button };

// src/components/common/input/index.js

import React from 'react';
import { TextInput, View, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  keyboardType: PropTypes.string,
  onFocus: PropTypes.func,
  large: PropTypes.bool,
  backgroundColor: PropTypes.string,
  info: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  error: PropTypes.string,
  style: PropTypes.any,
};

const defaultProps = {
  secureTextEntry: false,
  label: '',
  placeholder: '',
  autoFocus: false,
  keyboardType: 'default',
  large: false,
  onFocus: undefined,
  backgroundColor: 'transparent',
  info: '',
  max: 0,
  min: 0,
  error: '',
  style: {},
};

const Input = (props) => {
  const {
    secureTextEntry,
    label,
    placeholder,
    autoFocus,
    keyboardType,
    value,
    onFocus,
    onChangeText,
    large,
    backgroundColor,
    info,
    max,
    min,
    error,
    style,
  } = props;

  const {
    inputStyle,
    labelStyle,
    containerStyle,
    messageStyle,
    errorStyle,
  } = styles;


  const renderLabel = () => {
    if (label) {
      return <Text style={labelStyle}>{label}</Text>;
    }

    return <View />;
  };

  let characterLeft = 0;
  const countNumber = (text) => {
    if (max || min) {
      characterLeft = max - text.length;
      return onChangeText(text, characterLeft);
    }
    return onChangeText(text);
  };

  const renderMessage = () => {
    // Errors take precedence over messages
    if (error) {
      return <Text style={[messageStyle, errorStyle]}>{error}</Text>;
    } else if (info) {
      if (max || min) {
        return <Text style={messageStyle}>{info}</Text>;
      }
      return <Text style={messageStyle}>{info}</Text>;
    }

    return <View />;
  };


  let height = 48;
  let extraStyles = {};
  if (large) {
    height = 96;

    if (Platform.OS === 'android') {
      extraStyles = {
        borderWidth: 1,
        borderColor: '#AAA',
        borderRadius: 3,
        paddingHorizontal: 12,
      };
    }
  }

  // If the input has an error turn the container red
  if (error) {
    extraStyles.borderColor = '#DC584F';
  }

  return (
    <View style={style}>
      <View style={[containerStyle, { height, backgroundColor }, extraStyles]}>
        {renderLabel()}
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoCorrect={false}
          autoCapitalize={'none'}
          multiline={large}
          numberOfLines={large ? 4 : 1}
          placeholderTextColor={'#AAA'}
          keyboardType={keyboardType}
          value={value}
          onFocus={onFocus}
          onChangeText={text => countNumber(text)}
          style={inputStyle}
          underlineColorAndroid={large ? 'transparent' : null}
        />
      </View>
      {renderMessage()}
    </View>
  );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export { Input };

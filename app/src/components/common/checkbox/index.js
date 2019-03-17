// src/components/common/checkbox/index.js

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  value: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeState: PropTypes.func.isRequired,
  style: PropTypes.any,
  borderColor: PropTypes.string,
  error: PropTypes.string,
};

const defaultProps = {
  style: {},
  borderColor: '#595959',
  error: '',
};

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxChecked: props.value,
    };
  }

  handlePress() {
    const { onChangeState } = this.props;
    let { checkboxChecked } = this.state;

    // Negate the current value
    checkboxChecked = !checkboxChecked;

    // Trigger a state change to re-render
    this.setState({ checkboxChecked });

    // Trigger the callback
    onChangeState(checkboxChecked);
  }

  renderCheckbox() {
    const { error } = this.props;
    const { checkboxChecked } = this.state;
    const { selectedCheckboxStyle, emptyCheckboxStyle } = styles;
    let { borderColor } = this.props;

    if (checkboxChecked) {
      return <Image style={selectedCheckboxStyle} source={require('./img/checkbox-checked.png')} />;
    }

    if (error) {
      borderColor = '#DC584F';
    }

    return <View style={[emptyCheckboxStyle, { borderColor }]} />;
  }

  renderError() {
    const { error } = this.props;
    const { errorStyle } = styles;

    if (error) {
      return <Text style={errorStyle}>{error}</Text>;
    }

    return <View />;
  }

  render() {
    const { style, children } = this.props;
    const { containerStyle, checkboxContainerStyle } = styles;

    return (
      <View style={[containerStyle, style]}>
        <TouchableOpacity style={checkboxContainerStyle} onPress={() => this.handlePress()}>
          {this.renderCheckbox()}
        </TouchableOpacity>
        {children}
        {this.renderError()}
      </View>
    );
  }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export { Checkbox };

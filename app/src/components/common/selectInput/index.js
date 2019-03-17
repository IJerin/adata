// src/components/common/selectInput/index.js

import React, { Component } from 'react';
import { TouchableWithoutFeedback, TextInput, View, Text, ScrollView, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const optionPropTypes = {
  onSelect: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  optionTextStyle: PropTypes.number.isRequired,
};

const optionDefaultProps = {
  optionTextStyle: 0,
};

const selectPropTypes = {
  value: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  scrollStyle: PropTypes.number,
  placeholder: PropTypes.string,
  style: PropTypes.number,
};

const selectDefaultProps = {
  disabled: false,
  scrollStyle: 0,
  placeholder: '',
  style: 0,
};

const Option = (props) => {
  const { onSelect, children, optionTextStyle } = props;
  const { optionContainerStyle } = styles;

  return (
    <TouchableWithoutFeedback
      style={optionContainerStyle}
      onPress={onSelect}
    >
      <View>
        <Text style={optionTextStyle !== 0 ? optionTextStyle : styles.optionTextStyle}>
          {children}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

Option.propTypes = optionPropTypes;
Option.defaultProps = optionDefaultProps;

class SelectInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      value: '',
    };
  }

  componentWillMount() {
    const { value, data } = this.props;

    if (value) {
      const selectedItem = data.find(item => (
        item.value === value
      ));

      if (selectedItem) {
        this.handleOptionPress(selectedItem);
      }
    }
  }

  handleInputPress() {
    const { disabled } = this.props;

    if (!disabled) {
      this.setState({ visible: !this.state.visible });
    }
  }

  handleOptionPress(item) {
    const { onSelect } = this.props;

    this.setState({ value: item.label, visible: false });
    onSelect(item.value);
  }

  renderOptions() {
    const { data } = this.props;

    return data.map(item => (
      <Option
        key={item.value}
        value={item.value}
        onSelect={() => this.handleOptionPress(item)}
      >
        {item.label}
      </Option>
    ));
  }

  renderIcon() {
    const { disabled } = this.props;
    const { iconContainerStyle, iconStyle } = styles;

    if (!disabled) {
      const iconSrc = require('./img/icon-chevron-down.png');

      return (
        <View style={iconContainerStyle}>
          <Image source={iconSrc} style={iconStyle} />
        </View>
      );
    }

    return <View />;
  }

  renderScrollView() {
    const { scrollStyle } = this.props;

    if (this.state.visible) {
      return (
        <ScrollView bounces={false} style={scrollStyle !== 0 ? scrollStyle : styles.scrollStyle}>
          {this.renderOptions()}
        </ScrollView>
      );
    }

    return <View />;
  }

  render() {
    const { placeholder, style } = this.props;
    const {
      containerStyle,
      inputContainerStyle,
      inputStyle,
    } = styles;

    return (
      <View>
        <View style={style !== 0 ? style : containerStyle}>
          <TouchableWithoutFeedback onPress={() => this.handleInputPress()}>
            <View style={inputContainerStyle}>
              <TextInput
                placeholder={placeholder}
                style={inputStyle}
                editable={false}
                value={this.state.value}
              />
              {this.renderIcon()}
            </View>
          </TouchableWithoutFeedback>
        </View>
        {this.renderScrollView()}
      </View>
    );
  }
}

SelectInput.propTypes = selectPropTypes;
SelectInput.defaultProps = selectDefaultProps;

export { SelectInput };

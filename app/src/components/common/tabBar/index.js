// src/components/common/tabBar/index.js

import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Label } from '../../common/';
import styles from './styles';

const propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTabChanged: PropTypes.func.isRequired,
  tabColor: PropTypes.string,
  selectedColor: PropTypes.string,
  style: PropTypes.any,
};

const defaultProps = {
  tabColor: '#1BAC95',
  selectedColor: '#333',
  style: {},
};

class TabBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: '',
      tabs: [],
    };
  }

  componentWillMount() {
    const { children, onTabChanged } = this.props;
    const { tabs } = this.state;

    children.forEach((child) => {
      tabs.push({ id: child.props.id, title: child.props.title });
    });

    // Set the state and trigger the initial state
    this.setState({ tabs, selected: tabs[0].id });
    onTabChanged(tabs[0].id);
  }

  onPress(id) {
    const { onTabChanged } = this.props;

    // Update the state to select the tab and update the parent via the passed in function
    this.setState({ selected: id });
    onTabChanged(id);
  }

  renderTabs() {
    const { tabColor, selectedColor } = this.props;
    const { tabs, selected } = this.state;
    const { tabContainerStyle, tabStyle, tabTextStyle, selectedTabStyle } = styles;

    return tabs.map((tab) => {
      const { id, title } = tab;
      const isSelected = selected === id;

      // If the tab is selected, don't make it pressable
      if (isSelected) {
        return (
          <View key={`${id}_tab`} style={[tabStyle, selectedTabStyle, { borderBottomColor: selectedColor }]}>
            <Label style={tabTextStyle} color={selectedColor}>{title}</Label>
          </View>
        );
      }

      // If the tab is unselected, have it react to an event
      return (
        <View key={`${id}_tab`} style={tabContainerStyle}>
          <TouchableOpacity
            style={tabStyle}
            onPress={() => this.onPress(id)}
          >
            <Label style={tabTextStyle} color={tabColor}>{title}</Label>
          </TouchableOpacity>
        </View>
      );
    });
  }

  render() {
    const { children, style } = this.props;
    const { containerStyle, tabBarStyle } = styles;

    return (
      <View style={[containerStyle, style]}>
        <View style={tabBarStyle}>
          {this.renderTabs()}
        </View>
        {children}
      </View>
    );
  }
}

TabBar.propTypes = propTypes;
TabBar.defaultProps = defaultProps;

export { TabBar };

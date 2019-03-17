// src/components/menuView/index.js

import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import I18n from '../../util/i18n';
import * as actions from '../../actions/';
import { ViewContainer, SectionTitle, MenuItem } from '../common/';
import Header from '../header/';
import styles from './styles';

const propTypes = {
  showAbout: PropTypes.func.isRequired,
  showFeedback: PropTypes.func.isRequired,
  showBecomeAuthor: PropTypes.func.isRequired,
  showTerms: PropTypes.func.isRequired,
  showPrivacy: PropTypes.func.isRequired,
};

class MenuView extends Component {
  handlePress(view) {
    switch (view) {
      case 'about':
        this.props.showAbout();
        break;
      case 'feedback':
        this.props.showFeedback();
        break;
      case 'author':
        this.props.showBecomeAuthor();
        break;
      case 'terms':
        this.props.showTerms();
        break;
      case 'privacy':
        this.props.showPrivacy();
        break;
      default:
        break;
    }

    Actions.menuContent();
  }

  render() {
    const { containerStyle, menuHeaderStyle, menuItemStyle } = styles;

    return (
      <ViewContainer>
        <Header allowBack color showImage />
        <View style={containerStyle}>
          <SectionTitle style={menuHeaderStyle}>{I18n.t('menu.title')}</SectionTitle>
          <ScrollView>
            <TouchableOpacity onPress={() => this.handlePress('about')}>
              <MenuItem style={menuItemStyle}>{I18n.t('menu.about')}</MenuItem>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress('feedback')}>
              <MenuItem style={menuItemStyle}>{I18n.t('menu.feedback')}</MenuItem>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress('author')}>
              <MenuItem style={menuItemStyle}>{I18n.t('menu.author')}</MenuItem>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress('terms')}>
              <MenuItem style={menuItemStyle}>{I18n.t('menu.terms')}</MenuItem>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress('privacy')}>
              <MenuItem style={menuItemStyle}>{I18n.t('menu.privacy')}</MenuItem>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ViewContainer>
    );
  }
}

MenuView.propTypes = propTypes;

export default connect(null, actions)(MenuView);

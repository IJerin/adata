// src/components/menuContent/aboutView/index.js

import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../../actions/';
import I18n from '../../../util/i18n';
import baseStyles from '../styles';
import classStyles from './styles';

const styles = Object.assign(classStyles, baseStyles);

const propTypes = {
  showBecomeAuthor: PropTypes.func.isRequired,
};

class AboutView extends Component {
  handleAuthorPagePress() {
    this.props.showBecomeAuthor();
  }

  render() {
    const {
      contentContainerStyle,
      separatorContainerStyle,
      textStyle,
      largeTextStyle,
      boldTextStyle,
    } = styles;

    return (
      <ScrollView style={contentContainerStyle}>
        <Text style={largeTextStyle}>{I18n.t('content.about.what')}</Text>
        <View style={separatorContainerStyle}>
          <Text style={textStyle}>{I18n.t('content.about.marketplace')}</Text>
          <View style={separatorContainerStyle}>
            <Text style={textStyle}>{I18n.t('content.about.who')}</Text>
            <View style={[separatorContainerStyle, { marginBottom: 24 }]}>
              <Text style={textStyle}>
                {I18n.t('content.about.author')}
              </Text>
              <TouchableHighlight style={{ alignItems: 'center' }} onPress={() => this.handleAuthorPagePress()}>
                <Text style={boldTextStyle}>{I18n.t('content.about.authorLink')}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

AboutView.propTypes = propTypes;

export default connect(null, actions)(AboutView);

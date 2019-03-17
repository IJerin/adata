// src/components/menuContentView/index.js

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import I18n from '../../util/i18n';
import { ViewContainer } from '../common/';
import Header from '../header/';
import AboutView from '../menuContent/aboutView/';
import AuthorView from '../menuContent/authorView/';
import FeedbackView from '../menuContent/feedbackView/';
import TermsView from '../menuContent/termsView/';
import PrivacyView from '../menuContent/privacyView/';
import styles from './styles';

const propTypes = {
  menuContentView: PropTypes.string.isRequired,
  guideId: PropTypes.number,
  photoId: PropTypes.number,
};

const defaultProps = {
  guideId: 0,
  photoId: 0,
};

class MenuContentView extends Component {
  getHeaderTitle() {
    const { menuContentView } = this.props;

    switch (menuContentView) {
      case 'about':
        return I18n.t('content.aboutTitle');
      case 'feedback':
        return I18n.t('content.feedbackTitle');
      case 'feedback-detail':
        return I18n.t('content.feedbackDetailTitle');
      case 'author':
        return I18n.t('content.authorTitle');
      case 'terms':
        return I18n.t('content.termsTitle');
      case 'privacy':
        return I18n.t('content.privacyTitle');
      default:
        return '';
    }
  }

  getContent() {
    const { menuContentView, guideId, photoId } = this.props;

    switch (menuContentView) {
      case 'about':
        return <AboutView />;
      case 'feedback':
      case 'feedback-detail':
        if (guideId !== 0 && photoId !== 0) {
          return <FeedbackView guideId={guideId} photoId={photoId} />;
        }

        return <FeedbackView />;
      case 'author':
        return <AuthorView />;
      case 'terms':
        return <TermsView />;
      case 'privacy':
        return <PrivacyView />;
      default:
        return <View />;
    }
  }

  render() {
    const { containerStyle } = styles;

    return (
      <ViewContainer>
        <Header title={this.getHeaderTitle()} allowBack color />
        <View style={containerStyle}>
          {this.getContent()}
        </View>
      </ViewContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { menuContentView } = state;

  return { menuContentView };
};

MenuContentView.propTypes = propTypes;
MenuContentView.defaultProps = defaultProps;

export default connect(mapStateToProps, null)(MenuContentView);

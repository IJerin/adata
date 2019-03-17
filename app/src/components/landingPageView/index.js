// src/components/landingPageView/index.js

import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import I18n from '../../util/i18n';
import { ViewContainer } from '../common/';
import Header from '../header/';
import Footer from '../landingPage/footer/';
import HomeView from '../landingPage/homeView/';
import MapView from '../landingPage/mapView/';
import BookmarkView from '../landingPage/bookmarkView/';
import ProfileView from '../landingPage/profileView/';
import styles from './styles';

const propTypes = {
  landingPageView: PropTypes.string.isRequired,
  author: PropTypes.object,
};

const defaultProps = {
  author: null,
};

class LandingPageView extends Component {
  getHeaderPosition() {
    const { landingPageView } = this.props;

    switch (landingPageView) {
      case 'profile':
      case 'world':
        return true;
      case 'home':
      case 'bookmark':
      default:
        return false;
    }
  }

  getHeaderImage() {
    const { landingPageView } = this.props;

    switch (landingPageView) {
      case 'home':
        return true;
      default:
        return false;
    }
  }

  renderView() {
    const { landingPageView, author } = this.props;

    switch (landingPageView) {
      case 'world':
        return <MapView />;
      case 'bookmark':
        return <BookmarkView />;
      case 'profile':
        if (author) {
          return <ProfileView author={author} />;
        }

        return <ProfileView />;
      default:
        return <HomeView />;
    }
  }

  renderHeader() {
    const { landingPageView, author } = this.props;

    switch (landingPageView) {
      case 'world':
        return <Header absolute right />;
      case 'bookmark':
        return <Header color title={I18n.t('landingPage.saved')} right />;
      case 'profile':
        if (author) {
          return <Header absolute allowBack />;
        }

        return <Header absolute right />;
      case 'home':
      default:
        return <Header color showImage right />;
    }
  }

  renderFooter() {
    const { landingPageView, author } = this.props;

    switch (landingPageView) {
      case 'profile':
        if (author) {
          return <View />;
        }

        return <Footer />;
      case 'world':
      case 'bookmark':
      case 'home':
      default:
        return <Footer />;
    }
  }

  render() {
    const { contentContainerStyle } = styles;

    return (
      <ViewContainer>
        { this.renderHeader() }
        <ScrollView style={contentContainerStyle}>
          { this.renderView() }
        </ScrollView>
        { this.renderFooter() }
      </ViewContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { landingPageView } = state;

  return { landingPageView };
};

LandingPageView.propTypes = propTypes;
LandingPageView.defaultProps = defaultProps;

export default connect(mapStateToProps, null)(LandingPageView);

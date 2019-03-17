// src/components/directionsPanel/index.js

import React, { Component } from 'react';
import { View, Linking, Platform } from 'react-native';
import { connect } from 'react-redux';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import PropTypes from 'prop-types';

import I18n from '../../util/i18n';
import { Button } from '../common/';
import ModalMenu from '../modalMenu/';
import styles from './styles';

const tracker = new GoogleAnalyticsTracker('UA-98721832-1');

const propTypes = {
  location: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};

const defaultProps = {
  disabled: false,
};

class DirectionsPanel extends Component {
  constructor() {
    super();
    this.state = {
      installedApps: [
        Platform.OS === 'ios' ? {
          name: I18n.t('directions.apple'),
          key: 'apple',
          uri: 'http://maps.apple.com/',
        } : {
          name: I18n.t('directions.google'),
          key: 'android',
          uri: 'geo:',
        },
      ],
      lastApp: Platform.OS === 'ios' ? 'apple' : 'android',
      showAppsModal: false,
      showIntermediateModal: false,
      directionType: 'shooting',
    };
  }

  componentWillMount() {
    const apps = [{
      name: I18n.t('directions.waze'),
      key: 'waze',
      uri: 'waze://',
    }];

    if (Platform.OS === 'ios') {
      apps.push({
        name: I18n.t('directions.google'),
        key: 'google',
        uri: 'comgooglemaps://',
      });
    }

    apps.forEach((app) => {
      Linking.canOpenURL(app.uri).then((supported) => {
        if (supported) {
          const newApps = this.state.installedApps.slice();
          newApps.push(app);
          this.setState({ installedApps: newApps, lastApp: app.key });
        }
      });
    }, this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { installedApps, showAppsModal, showIntermediateModal, directionType } = this.state;

    // If the location type was updated, and no modals are shown, it means only one app was installed, so open it
    if (prevState.directionType !== directionType) {
      if (!showAppsModal && !showIntermediateModal) {
        this.prepareAndOpenApp(installedApps[0]);
      }
    }
  }

  handleDirectionsPress() {
    const { disabled, location } = this.props;
    const { installedApps } = this.state;

    if (disabled) {
      return;
    }

    // If a parking location exists, show the modal to select between them
    if (location.parking) {
      this.setState({
        showIntermediateModal: true,
      });
    } else if (installedApps.length > 1) {
      // If more than one app is installed, then prompt the user which one to use
      this.setState({
        showAppsModal: true,
      });
    } else {
      // Otherwise, just open the app with the shooting location
      this.prepareAndOpenApp(installedApps[0]);
    }
  }

  handleAppPress(app) {
    tracker.trackEvent('app', `Opening ${app.name}`);
    this.prepareAndOpenApp(app);
    this.setState({ showAppsModal: false });
  }

  handleCancelPress() {
    this.setState({
      showIntermediateModal: false,
      showAppsModal: false,
    });
  }

  prepareAndOpenApp(app) {
    const { location } = this.props;
    const { directionType } = this.state;

    let lat = location.lat;
    let long = location.long;

    if (directionType === 'parking') {
      lat = location.parking.lat;
      long = location.parking.long;
    }

    let uri = app.uri;

    switch (app.key) {
      case 'apple':
      case 'google':
        uri += `?daddr=${lat},${long}`;
        break;
      case 'waze':
        uri += `?ll=${lat},${long}&navigate=yes`;
        break;
      case 'android':
      default:
        uri += `?q=loc:${lat},${long}`;
        break;
    }

    Linking.openURL(uri)
      .catch(err => console.error(`An error occurred ${err}`));
  }

  openAppModal(type) {
    const { installedApps } = this.state;

    // If more than one maps app is installed, prompt the user, otherwise just go right to it
    this.setState({
      directionType: type,
      showIntermediateModal: false,
      showAppsModal: installedApps.length > 1,
    });
  }

  renderIntermediateModal() {
    const {
      intermediateModalButton,
      modalCancelButtonStyle,
      intermediateModalButtonContainer,
    } = styles;

    const { showIntermediateModal } = this.state;
    const height = 188;

    return (
      <ModalMenu
        visible={showIntermediateModal}
        height={height}
        animationType={'fade'}
      >
        <View style={intermediateModalButtonContainer}>
          <View style={modalCancelButtonStyle}>
            <Button
              style={intermediateModalButton}
              onPress={() => this.openAppModal('shooting')}
            >
              {I18n.t('directions.shootingLocation')}
            </Button>
            <Button
              style={intermediateModalButton}
              onPress={() => this.openAppModal('parking')}
            >
              {I18n.t('directions.parkingLocation')}
            </Button>
            <Button
              secondary
              style={intermediateModalButton}
              onPress={() => this.handleCancelPress()}
            >
              {I18n.t('directions.cancel')}
            </Button>
          </View>
        </View>
      </ModalMenu>
    );
  }

  renderAppModal() {
    const { modalCancelButtonStyle } = styles;
    const { installedApps, showAppsModal } = this.state;
    const height = 84 + (installedApps.length * 52);
    return (
      <ModalMenu
        visible={showAppsModal}
        height={height}
        animationType={'fade'}
      >
        <View>
          { this.renderModalButtons() }
          <View style={modalCancelButtonStyle}>
            <Button
              secondary
              onPress={() => this.handleCancelPress()}
            >
              {I18n.t('directions.cancel')}
            </Button>
          </View>
        </View>
      </ModalMenu>
    );
  }

  renderModalButtons() {
    const { installedApps, lastApp } = this.state;
    const { modalButtonStyle } = styles;

    // Check number of apps installed and set up click handlers
    return installedApps.map((app) => {
      let style = modalButtonStyle;

      if (lastApp === app.key) {
        style = [modalButtonStyle, { marginBottom: 0 }];
      }

      return (
        <View key={app.key} style={style}>
          <Button
            onPress={() => this.handleAppPress(app)}
          >
            {`${I18n.t('directions.open')} ${app.name}`}
          </Button>
        </View>
      );
    });
  }


  render() {
    const {
      buttonContainerStyle,
    } = styles;

    const { disabled } = this.props;

    // Show button text based on if the location has parking


    return (
      <View>
        {this.renderIntermediateModal()}
        {this.renderAppModal()}
        <View style={buttonContainerStyle}>
          <Button onPress={() => this.handleDirectionsPress()} disabled={disabled}>{I18n.t('directions.directions')}</Button>
        </View>
      </View>
    );
  }
}

DirectionsPanel.propTypes = propTypes;
DirectionsPanel.defaultProps = defaultProps;

export default connect(null)(DirectionsPanel);

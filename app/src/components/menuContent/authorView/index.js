// src/components/menuContent/authorView/index.js

import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';

import I18n from '../../../util/i18n';
import UtilFunctions from '../../../util/UtilFunctions';
import { Input, Button, Modal } from '../../common/';
import baseStyles from '../styles';
import classStyles from './styles';

const styles = Object.assign(classStyles, baseStyles);

class AuthorView extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentWillMount() {
    this.setState({
      view: 'initial',
      email: '',
      portfolio: '',
      buttonPressed: false,
      error: '',
    });
  }

  handlePorfolioFocus() {
    if (this.state.portfolio.length === 0) {
      this.setState({ portfolio: '@' });
    }
  }

  handlePortfolioChangeText(text) {
    if (text.length < 1) {
      this.setState({ portfolio: '@' });
    }

    this.setState({ portfolio: text });
  }

  handleButtonPress(disabled) {
    if (disabled) {
      return;
    }

    if (this.state.view === 'initial') {
      const emailValid = UtilFunctions.isEmailValid(this.state.email);
      if (emailValid && this.state.portfolio.length > 1) {
        // TODO: Make the call to the API
        const data = {
          email: this.state.email,
          portfolio: this.state.portfolio,
        };

        UtilFunctions.sendToApi('POST', 'inquire', data)
          .then(response => response.json())
          .then((responseJsonStr) => {
            const responseJson = JSON.parse(responseJsonStr);
            this.setState({ buttonPressed: false });
            if (responseJson.status === 0) {
              this.setState({ view: 'sent' });
            } else {
              this.setState({ error: responseJson.message });
            }
          })
          .catch((error) => {
            console.error(error);
            this.setState({ error: I18n.t('content.error.connectError') });
            this.setState({ buttonPressed: false });
          });

        this.setState({ buttonPressed: true });
      } else if (!emailValid) {
        this.setState({ error: I18n.t('content.author.error.email') });
      } else if (this.state.portfolio.length <= 1) {
        this.setState({ error: I18n.t('content.author.error.portfolio') });
      }
    } else {
      Actions.pop();
    }
  }

  renderError() {
    const {
      errorTextStyle,
    } = styles;

    if (this.state.error.length > 0) {
      return (
        <Text style={errorTextStyle}>
          {this.state.error}
        </Text>
      );
    }

    return <View />;
  }

  renderScrollView() {
    const {
      textStyle,
      headingTextStyle,
      separatingContainerStyle,
      inputContainerStyle,
    } = styles;

    if (this.state.view === 'initial') {
      return (
        <View>
          <Text style={textStyle}>{I18n.t('content.author.heading')}</Text>
          <View style={separatingContainerStyle}>
            <Text style={textStyle}>{I18n.t('content.author.description')}</Text>
            <View style={separatingContainerStyle}>
              {this.renderError()}
              <View style={inputContainerStyle}>
                <Input
                  autoFocus
                  placeholder={I18n.t('content.author.email')}
                  value={this.state.email}
                  onChangeText={text => this.setState({ email: text })}
                />
              </View>
              <View style={inputContainerStyle}>
                <Input
                  placeholder={I18n.t('content.author.portfolio')}
                  value={this.state.portfolio}
                  onFocus={() => this.handlePorfolioFocus()}
                  onChangeText={text => this.handlePortfolioChangeText(text)}
                />
              </View>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View>
        <Text style={headingTextStyle}>{I18n.t('content.author.thanksHeading')}</Text>
        <View style={separatingContainerStyle}>
          <Text style={textStyle}>{I18n.t('content.author.reviewing')}</Text>
        </View>
      </View>
    );
  }

  renderButton() {
    const disableButton = !UtilFunctions.isEmailValid(this.state.email) || this.state.portfolio.length <= 1;

    if (this.state.view === 'initial') {
      return (
        <Button
          disabled={disableButton}
          onPress={() => this.handleButtonPress(disableButton)}
        >
          {I18n.t('content.author.sendButton')}
        </Button>
      );
    }

    return <Button onPress={() => this.handleButtonPress()}>{I18n.t('content.author.returnButton')}</Button>;
  }

  render() {
    const {
      containerStyle,
      scrollContainerStyle,
      buttonContainerStyle,
    } = styles;

    const { buttonPressed } = this.state;

    return (
      <View style={containerStyle}>
        <Modal
          visible={buttonPressed}
        >
          <ActivityIndicator size={'large'} color={'#FFF'} />
        </Modal>
        <KeyboardAwareScrollView style={scrollContainerStyle} extraScrollHeight={20}>
          {this.renderScrollView()}
        </KeyboardAwareScrollView>
        <View style={buttonContainerStyle}>
          {this.renderButton()}
        </View>
      </View>
    );
  }
}

export default AuthorView;

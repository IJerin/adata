// src/components/splashScreen/index.js

import React, { Component } from 'react';
import { View, Image, Animated, Easing, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import * as actions from '../../actions/';
import UtilFunctions from '../../util/UtilFunctions';
import I18n from '../../util/i18n';
import {
  Input,
  Button,
  TabBar,
  Tab,
  Heading,
  Checkbox,
  Caption,
  Paragraph,
  Anchor,
} from '../../components/common/';
import styles from './styles';

const propTypes = {
  user: PropTypes.object.isRequired,
  showTerms: PropTypes.func.isRequired,
  showPrivacy: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
};

const LOGO_TOP_POS_SIGN_IN = 150;
const LOGO_TOP_POS_SIGN_UP = 80;
const TABS_TOP_POS_SIGN_IN = 116;
const TABS_TOP_POS_SIGN_UP = 66;

class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'initial',
      pageType: 'signin',
      selectedTab: '',
      email: '',
      password: '',
      acceptedTerms: true,
      typeTextCaps: I18n.t('splash.signin_caps'),
      typeText: I18n.t('splash.signin'),
      logoMoveAnim: new Animated.Value(218),
      fieldMoveAnim: new Animated.Value(Dimensions.get('window').height + 20),
      errors: {
        email: '',
        password: '',
        checkbox: '',
        oauth: '',
      },
    };
  }

  componentWillMount() {
    setTimeout(() => {
      // If the user is logged in,just show the initial page
      if (this.isUserLoggedIn()) {
        Actions.landingPage();
      } else {
        // Otherwise, do the animation to show the login/sign up fields
        this.animateElements(LOGO_TOP_POS_SIGN_IN, TABS_TOP_POS_SIGN_IN, 1000, () => {
          // Set the state
          this.setState({ status: 'buttons' });
        });
      }
    }, 2000);
  }

  handleAccountPress() {
    const { pageType } = this.state;
    let logoTopPos = LOGO_TOP_POS_SIGN_IN;
    let fieldTopPos = TABS_TOP_POS_SIGN_IN;

    if (pageType === 'signin') {
      this.setState({ pageType: 'signup', acceptedTerms: false });
      logoTopPos = LOGO_TOP_POS_SIGN_UP;
      fieldTopPos = TABS_TOP_POS_SIGN_UP;
    } else {
      this.setState({ pageType: 'signin', acceptedTerms: true });
    }

    // Animate the elements to compensate the type switch
    this.animateElements(logoTopPos, fieldTopPos, 250);
  }

  handleOAuthPress(platform, disabledButton) {
    const { pageType, email, acceptedTerms } = this.state;

    // If the button is disabled, there is a problem
    if (pageType !== 'signin' && disabledButton) {
      const errors = this.state.errors;

      // Signing up requires an email
      if (!UtilFunctions.isEmailValid(email)) {
        errors.email = `${I18n.t('splash.invalidEmail')}; ${I18n.t('splash.emailHint')}`;
      } else {
        errors.email = '';
      }

      // Signing up requires the user accepts terms and privacy policy
      if (!acceptedTerms) {
        errors.checkbox = I18n.t('splash.invalidTerms');
      } else {
        errors.checkbox = '';
      }

      // Set the state errors so they show to the user
      this.setState({ errors });

      return;
    }

    const user = {};

    UtilFunctions.handleOAuth(platform, (error, accessToken, uid) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(accessToken);
      console.log(uid);

      // Call the API to get user info

      user.name = 'User';
      user.accessToken = accessToken;
      user.oAuthId = uid;
      user.platform = platform;

      this.props.signIn(user);
      Actions.landingPage();
    });
  }

  handleSubmit(disabledButton) {
    const { pageType, email, password, acceptedTerms } = this.state;

    // If the button is disabled, there is a problem
    if (disabledButton) {
      const errors = this.state.errors;

      // A valid email is required
      if (!UtilFunctions.isEmailValid(email)) {
        errors.email = `${I18n.t('splash.invalidEmail')}; ${I18n.t('splash.emailHint')}`;
      } else {
        errors.email = '';
      }

      // A valid password is required; 8 char miniumum, 1 cap, 1 lower, and 1 number
      if (!UtilFunctions.isPasswordValid(password)) {
        const passwordAdjective = pageType === 'signin' ? 'splash.incorrectPassword' : 'splash.invalidPassword';

        errors.password = `${I18n.t(passwordAdjective)}; ${I18n.t('splash.passwordHint')}`;
      } else {
        errors.password = '';
      }

      // Signing up requires the user to accept the terms and privacy policy
      if (pageType !== 'signin' && !acceptedTerms) {
        errors.checkbox = I18n.t('splash.invalidTerms');
      } else {
        errors.checkbox = '';
      }

      // Set the state errors so they show to the user
      this.setState({ errors });

      return;
    }

    const user = {
      name: 'User',
      platform: 'email',
    };

    this.props.signIn(user);
    Actions.landingPage();
  }

  isUserLoggedIn() {
    const { user } = this.props;

    return Object.keys(user).length > 0;
  }

  animateElements(logoTopPos, fieldTopPos, duration, callback) {
    let postAnimationFunction = () => {};

    if (callback) {
      postAnimationFunction = callback;
    }

    Animated.parallel([
      Animated.timing(
        this.state.logoMoveAnim,
        {
          toValue: logoTopPos,
          // easing: Easing.inOut(Easing.cubic()),
          duration,
        },
      ),
      Animated.timing(
        this.state.fieldMoveAnim,
        {
          toValue: fieldTopPos,
          // easing: Easing.inOut(Easing.cubic()),
          duration,
        },
      ),
    ]).start(postAnimationFunction);
  }

  renderCheckbox() {
    const { acceptedTerms, pageType, errors } = this.state;
    const { checkboxContainerStyle } = styles;

    if (pageType !== 'signin') {
      return (
        <Checkbox
          style={checkboxContainerStyle}
          value={acceptedTerms}
          error={errors.checkbox}
          onChangeState={value => this.setState({ acceptedTerms: value })}
        >
          <Paragraph>{I18n.t('splash.readAndAgree')} </Paragraph>
          <Anchor
            style={{ marginLeft: 28 }}
            onPress={() => { this.props.showTerms(); Actions.menuContent(); }}
          >
            {`${I18n.t('splash.terms')} `}
          </Anchor>
          <Paragraph>{I18n.t('splash.and')} </Paragraph>
          <Anchor
            onPress={() => { this.props.showPrivacy(); Actions.menuContent(); }}
          >
            {I18n.t('splash.privacy')}
          </Anchor>
        </Checkbox>
      );
    }

    return <View />;
  }

  renderCheckboxError() {
    const { errors } = this.state;

    if (errors.checkbox) {
      return (
        <Caption
          error
          style={{ marginTop: 4 }}
        >
          {errors.checkbox}
        </Caption>
      );
    }

    return <View />;
  }

  renderEmailInput() {
    const { pageType } = this.state;

    if (pageType !== 'signin') {
      return (
        <Input
          placeholder={I18n.t('splash.emailPlaceholder')}
          keyboardType={'email-address'}
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
          autoFocus
        />
      );
    }

    return <View />;
  }

  renderOAuthPanel(platform) {
    const { pageType, email, acceptedTerms } = this.state;
    const { fieldContainerStyle, fieldInnerContainerStyle } = styles;

    // Update the title text based on the type
    const typeText = pageType === 'signin' ? I18n.t('splash.signin') : I18n.t('splash.signup');
    let disabledButton = false;
    let oAuthIcon = require('./img/splash-instagram-logo.png');

    // Disable the button if it's signup and the user hasn't entered their email or accepted terms
    if (pageType !== 'signin') {
      disabledButton = !UtilFunctions.isEmailValid(email) || !acceptedTerms;
    }

    if (platform === 'facebook') {
      oAuthIcon = require('./img/splash-facebook-logo.png');
    }

    return (
      <View style={fieldContainerStyle}>
        <View style={fieldInnerContainerStyle}>
          {this.renderEmailInput()}
          {this.renderCheckbox()}
          <Button
            image={oAuthIcon}
            disabled={disabledButton}
            onPress={() => this.handleOAuthPress(platform, disabledButton)}
          >
            {`${typeText} with ${platform.split('')[0].toUpperCase() + platform.slice(1)}`}
          </Button>
          {this.renderOtherAccountOption()}
        </View>
      </View>
    );
  }

  renderEmailPanel() {
    const { pageType, email, password, acceptedTerms, errors } = this.state;

    const {
      fieldContainerStyle,
      fieldInnerContainerStyle,
      fieldInputStyle,
    } = styles;

    // Update the title text based on the type
    const typeText = pageType === 'signin' ? I18n.t('splash.signin') : I18n.t('splash.signup');
    const disabledButton = !UtilFunctions.isEmailValid(email) || !UtilFunctions.isPasswordValid(password) || (!acceptedTerms)

    return (
      <View style={fieldContainerStyle}>
        <View style={fieldInnerContainerStyle}>
          <Input
            style={fieldInputStyle}
            placeholder={I18n.t('splash.emailPlaceholder')}
            keyboardType={'email-address'}
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
            error={errors.email}
            autoFocus
          />
          <Input
            style={fieldInputStyle}
            placeholder={I18n.t('splash.passwordPlaceholder')}
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
            info={pageType !== 'signin' ? I18n.t('splash.passwordHint') : ''}
            error={errors.password}
            secureTextEntry
          />
          {this.renderCheckbox()}
          <Button
            disabled={disabledButton}
            onPress={() => this.handleSubmit(disabledButton)}
          >
            {typeText}
          </Button>
          {this.renderOtherAccountOption()}
        </View>
      </View>
    );
  }

  renderOtherAccountOption() {
    const { pageType } = this.state;

    let accountText = `${I18n.t('splash.newToViewfinder')} `;
    let actionText = `${I18n.t('splash.create')}`;

    if (pageType !== 'signin') {
      accountText = `${I18n.t('splash.alreadyHaveAnAccount')} `;
      actionText = `${I18n.t('splash.signin')}`;
    }

    return (
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 16 }}>
        <Paragraph>{accountText}</Paragraph>
        <Anchor onPress={() => this.handleAccountPress()}>{actionText}</Anchor>
      </View>
    );
  }

  render() {
    const {
      containerStyle,
      backgroundContainerStyle,
      backgroundImgStyle,
      logoContainerStyle,
      logoImgStyle,
      fieldContainerStyle,
      keyboardScrollContainerStyle,
    } = styles;

    const {
      logoMoveAnim,
      fieldMoveAnim,
      pageType,
      selectedTab,
    } = this.state;

    const logoSrc = require('./img/splash-logo.png');
    const backgroundSrc = require('./img/splash-bg.jpg');

    // Update the title text based on the type
    const typeTextCaps = pageType === 'signin' ? I18n.t('splash.signin_caps') : I18n.t('splash.create');

    return (
      <View style={containerStyle}>
        <View style={backgroundContainerStyle}>
          <Image style={backgroundImgStyle} source={backgroundSrc} />
        </View>
        <KeyboardAwareScrollView style={keyboardScrollContainerStyle}>
          <Animated.View style={{ height: logoMoveAnim }} />
          <View style={logoContainerStyle}>
            <Image style={logoImgStyle} source={logoSrc} />
          </View>
          <Animated.View style={{ height: fieldMoveAnim }} />
          <View style={fieldContainerStyle}>
            <Heading level={1} style={{ color: '#FFF', textAlign: 'center', marginBottom: 24 }}>{typeTextCaps}</Heading>
            <TabBar
              onTabChanged={key => this.setState({ selectedTab: key })}
            >
              <Tab
                id={'instagram'}
                title={'Instagram'}
                selectedTab={selectedTab}
              >
                {this.renderOAuthPanel('instagram')}
              </Tab>
              <Tab
                id={'facebook'}
                title={'Facebook'}
                selectedTab={selectedTab}
              >
                {this.renderOAuthPanel('facebook')}
              </Tab>
              <Tab
                id={'email'}
                title={'Email'}
                selectedTab={selectedTab}
              >
                {this.renderEmailPanel()}
              </Tab>
            </TabBar>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;

  return { user };
};

SplashScreen.propTypes = propTypes;

export default connect(mapStateToProps, actions)(SplashScreen);

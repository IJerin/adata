// src/index.js

import React, { Component } from 'react';
import { StatusBar, Alert, Platform } from 'react-native';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { Router, Stack, Scene, ActionConst } from 'react-native-router-flux';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge';
import RNRestart from 'react-native-restart';
import HockeyApp from 'react-native-hockeyapp';

import I18n from './util/i18n';
import reducers from './reducers/';
import SplashScreen from './components/splashScreen/';
import GuideDetailGridView from './components/guideDetailGridView/';
import GuideDetailMapView from './components/guideDetailMapView/';
import MenuView from './components/menuView/';
import PhotoDetailView from './components/photoDetailView/';
import SearchView from './components/searchView/';
import MenuContentView from './components/menuContentView/';
import NavigationView from './components/navigationView/';
import LandingPageView from './components/landingPageView/';
import PhotoZoomView from './components/photoZoomView/';
import NewGuide from './components/newGuide/';
import NewPhoto from './components/newPhoto/';

// const HOCKEY_APP_ID_IOS = '9c746bf489b440cf8819fbb062457f55';
// const HOCKEY_APP_ID_ANDROID = 'b5dd4c6810ce4476a64d9a252801745d';
const ConnectedRouter = connect()(Router);
const store = createStore(reducers);

const tracker = new GoogleAnalyticsTracker('UA-98721832-1');

// Set Exception Handlers to report back to HockeyApp with crash reports
setJSExceptionHandler((e, isFatal) => {
  HockeyApp.addMetadata({
    errorType: 'js',
    errorName: e.name,
    errorMessage: e.message,
  });

  if (isFatal) {
    Alert.alert(
      I18n.t('errors.unexpected'),
      `${I18n.t('fatal')}: ${e.name} ${e.message} ${I18n.t('errors.restartMessage')}.`,
      [{
        text: I18n.t('errors.restart'),
        onPress: () => {
          RNRestart.Restart();
        },
      }],
    );
  } else {
    // Log it to the console, works for Android (do something for iOS?)
    console.info(e);
  }
});

setNativeExceptionHandler((errorString) => {
  HockeyApp.addMetadata({
    errorType: 'native',
    error: errorString,
  });
});

class App extends Component {
  constructor() {
    super();

    this.shouldReplace = false;
  }

  componentWillMount() {
    // Set up global Google Analytics values
    GoogleAnalyticsSettings.setDispatchInterval(10);
    // GoogleAnalyticsSettings.setDryRun(true);

    if (Platform.OS === 'ios') {
      console.info('ios');
    //   HockeyApp.configure(HOCKEY_APP_ID_IOS, true);
    } else if (Platform.OS === 'android') {
      console.info('android');
    //   HockeyApp.configure(HOCKEY_APP_ID_ANDROID, true);
    }
  }

  componentDidMount() {
    // HockeyApp.start();
  }

  handleOnEnter(viewName, statusBarColor) {
    if (statusBarColor) {
      let barColor = 'dark-content';
      if (statusBarColor === 'light') {
        barColor = 'light-content';
      }

      StatusBar.setBarStyle(barColor, false);
    }

    // Track the screen change
    tracker.trackScreenView(viewName);
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter sceneStyle={{ backgroundColor: '#FFF', flex: 1 }}>
          <Stack key="root">
            <Scene key="splash" hideNavBar component={SplashScreen} />
            <Scene
              initial
              key="landingPage"
              hideNavBar
              component={LandingPageView}
              onEnter={() => {
                this.shouldReplace = false;
                this.handleOnEnter('Landing Page', 'dark');
              }}
              type={this.shouldReplace ? ActionConst.REPLACE : ActionConst.PUSH}
            />
            <Scene
              key="guideDetailGrid"
              hideNavBar
              component={GuideDetailGridView}
              onEnter={() => this.handleOnEnter('Guide Detail Grid', 'light')}
            />
            <Scene
              key="newGuide"
              hideNavBar
              component={NewGuide}
              onEnter={() => this.handleOnEnter('New Guide', 'light')}
            />
            <Scene

              key="newPhoto"
              hideNavBar
              component={NewPhoto}
              onEnter={() => this.handleOnEnter('New Photo', 'light')}
            />
            <Scene
              key="guideDetailMap"
              hideNavBar
              component={GuideDetailMapView}
              onEnter={() => this.handleOnEnter('Guide Detail Map', 'light')}
            />
            <Scene key="menu" hideNavBar component={MenuView} onEnter={() => this.handleOnEnter('Menu', 'dark')} />
            <Scene
              key="menuContent"
              hideNavBar
              component={MenuContentView}
              onEnter={() => this.handleOnEnter('Content', 'dark')}
            />
            <Scene key="search" hideNavBar component={SearchView} onEnter={() => this.handleOnEnter('Search')} />
            <Scene
              key="photoDetail"
              hideNavBar
              component={PhotoDetailView}
              onEnter={() => this.handleOnEnter('Photo Detail', 'light')}
            />
            <Scene
              key="navigation"
              hideNavBar
              component={NavigationView}
              onEnter={() => this.handleOnEnter('Navigation', 'light')}
            />
            <Scene

              key="photoZoom"
              hideNavBar
              component={PhotoZoomView}
              onEnter={() => this.handleOnEnter('photoZoom', 'dark')}
            />
          </Stack>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;

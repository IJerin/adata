// index.android.js

import { AppRegistry } from 'react-native';
import codePush from 'react-native-code-push';

import App from './src/';

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
const AppWithCodePush = codePush(codePushOptions)(App);

// Render the app to the device
AppRegistry.registerComponent('Viewfinder', () => AppWithCodePush);

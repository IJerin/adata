// src/util/UtilFunctions.js

import { Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import shittyQs from 'shitty-qs';
import { btoa } from 'Base64';

const BASE_URL = 'https://api.getviewfinder.com/';
const OAUTH_REDIRECT_URI = 'viewfinder://oauth';

const INSTAGRAM_OAUTH_URL = 'https://api.instagram.com/oauth/authorize/';
const INSTAGRAM_APP_KEY = 'adb40a86e9604d68b66563a03bb6d78b';
const FACEBOOK_OAUTH_URL = 'https://api.instagram.com/oauth/authorize/';
const FACEBOOK_APP_KEY = 'adb40a86e9604d68b66563a03bb6d78b';

/* global Response, fetch */

class UtilFunctions {
  static createCoordinatesObj(lat, long) {
    return { lat, long };
  }

  static getCenterCoordinates(markers) {
    const nMarkers = markers.length;

    // Get the center of the markers
    let lat = 0.0;
    let long = 0.0;

    markers.forEach((m) => {
      lat += m.lat;
      long += m.long;
    });

    // Divide it by the number of markers to get the middle and return it
    return this.createCoordinatesObj(lat / nMarkers, long / nMarkers);
  }

  static flattenArray(array) {
    return array.reduce((arr, val) => {
      if (Array.isArray(val)) {
        return arr.concat(this.flattenArray(val));
      }

      return arr.concat(val);
    }, []);
  }

  //
  // A valid email has the following properties:
  //   - It contains an @
  //
  static isEmailValid(email) {
    // TODO: Expand me
    return email.length > 0 && email.indexOf('@') !== -1;
  }

  //
  // A valid password has the following properies:
  //   - Has at least 8 characters
  //   - Contains at least 1 capital letter
  //   - Contains at least 1 lowercase letter
  //   - Contains at least 1 number
  //
  static isPasswordValid(password) {
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*_]+$/;

    // TODO: Expand me
    return password.length > 7 && regex.test(password);
  }

  static generateRandomString(numChars) {
    const possibilities = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*+=-';
    let text = '';

    for (let i = 0; i < numChars; i++) {
      text += possibilities.charAt(Math.floor(Math.random() * possibilities.length));
    }

    return text;
  }

  /* callback should have the signature (error, accessToken, uid) */
  static handleOAuth(type, callback) {
    // If this is running in a simulator, just return immediately with hard-coded info
    // if (DeviceInfo.isEmulator()) {
    if (true) {
      callback(null, 'dev', 1);
      return;
    }

    // Otherwise call the OAuth API
    const token = this.generateRandomString(16);
    const oAuthUrl = type === 'instagram' ? INSTAGRAM_OAUTH_URL : FACEBOOK_OAUTH_URL;
    const appKey = type === 'instagram' ? INSTAGRAM_APP_KEY : FACEBOOK_APP_KEY;

    const handleUrl = (event) => {
      const queryString = event.url.substr(event.url.indexOf('#') + 1); // Extract the # value
      const query = shittyQs(queryString);
      if (token === query.token) {
        // No error, return the goods
        callback(null, query.access_token, query.uid);
      } else {
        // Just return an error if a security violation happens
        callback(new Error('Token from OAuth response does not match'));
      }

      // Remove the event handler to allow passthrough
      Linking.removeEventListener('url', handleUrl);
    };

    // Add a listener to capture the response
    Linking.addEventListener('url', handleUrl);

    // Call the OAuth URL and parameters
    Linking.openURL([
      oAuthUrl,
      '?response_type=token',
      `&client_id=${appKey}`,
      `&redirect_uri=${OAUTH_REDIRECT_URI}`,
      `&token=${token}`,
    ].join(''));
  }

  static printLocation(locationObj, useStateShort) {
    const { city, country } = locationObj;

    let locationStr = `${city}, `;

    // TODO: Check this
    // Only need states for US
    if (country === 'USA' || country === 'United States' || country === 'United States of America') {
      locationStr += `${useStateShort ? locationObj.stateShort : locationObj.state}, `;
    }

    locationStr += country;

    return locationStr;
  }

  static printTimeOfDay(hours, minutes) {
    let suffix = 'am';
    let adjustedHours = hours;
    let adjustedMinutes = minutes;

    if (adjustedHours > 12) {
      suffix = 'pm';
      adjustedHours -= 12;
    }

    if (adjustedMinutes < 10) {
      adjustedMinutes = `0${adjustedMinutes}`;
    }

    return `${adjustedHours}:${adjustedMinutes}${suffix}`;
  }

  static printDistance(distanceInFeet, units) {
    let distance = distanceInFeet;

    switch (units) {
      case 'in':
        distance /= 12.0;
        break;
      case 'ft':
      default:
        break;
    }

    return `${distance}${units}`;
  }

  static printTime(timeInSeconds, units) {
    let time = timeInSeconds;

    switch (units) {
      case 'min':
        time /= 60.0;
        break;
      case 'sec':
      default:
        break;
    }

    return `${time}${units}`;
  }

  static sendToApi(method, url, data) {
    // Add the auth token to the request body
    data.token = btoa(`${this.generateRandomString(5)}_c0ry154w350m3_${this.generateRandomString(5)}`);

    // If this is running in a simulator the promise
    if (DeviceInfo.isEmulator()) {
      return new Promise((resolve) => {
        console.info(`METHOD: ${method}`);
        console.info(`URL: ${BASE_URL}${url}`);
        console.info(`DATA: ${JSON.stringify(data)}`);

        // Needs to be double stringified to emulate our server
        const responseData = JSON.stringify(JSON.stringify({
          status: 0,
          message: '',
        }));

        const initData = {
          status: 200,
          statusText: 'OK',
        };

        // Simulate a network call (~2sec)
        setTimeout(() => {
          resolve(new Response(responseData, initData));
        }, 2000);
      });
    }

    // Otherwise make the call to the API and return the promise
    return fetch(`${BASE_URL}${url}`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
}

export default UtilFunctions;

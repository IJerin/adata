// src/actions/index.js

import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

import ACTION_TYPES from './actionTypes';

const tracker = new GoogleAnalyticsTracker('UA-98721832-1');

// Menu View actions
export const showAbout = () => {
  tracker.trackScreenView('About');
  return {
    type: ACTION_TYPES.SWITCH_MENU_CONTENT_VIEW,
    payload: 'about',
  };
};

export const showFeedback = (flag) => {
  let payload = 'feedback';

  if (flag && flag === 'detail') {
    payload = 'feedback-detail';
  }

  tracker.trackScreenView('Feedback');

  return {
    type: ACTION_TYPES.SWITCH_MENU_CONTENT_VIEW,
    payload,
  };
};

export const showBecomeAuthor = () => {
  tracker.trackScreenView('Author');

  return {
    type: ACTION_TYPES.SWITCH_MENU_CONTENT_VIEW,
    payload: 'author',
  };
};

export const showTerms = () => {
  tracker.trackScreenView('Terms');

  return {
    type: ACTION_TYPES.SWITCH_MENU_CONTENT_VIEW,
    payload: 'terms',
  };
};

export const showPrivacy = () => {
  tracker.trackScreenView('Privacy');
  return {
    type: ACTION_TYPES.SWITCH_MENU_CONTENT_VIEW,
    payload: 'privacy',
  };
};

// Store actions
export const showHome = () => {
  tracker.trackScreenView('Home');

  return {
    type: ACTION_TYPES.SWITCH_LANDING_PAGE_VIEW,
    payload: 'home',
  };
};

export const showWorld = () => {
  tracker.trackScreenView('World');

  return {
    type: ACTION_TYPES.SWITCH_LANDING_PAGE_VIEW,
    payload: 'world',
  };
};

export const showBookmark = () => {
  tracker.trackScreenView('Bookmark');

  return {
    type: ACTION_TYPES.SWITCH_LANDING_PAGE_VIEW,
    payload: 'bookmark',
  };
};

export const showProfile = () => {
  tracker.trackScreenView('Profile');

  return {
    type: ACTION_TYPES.SWITCH_LANDING_PAGE_VIEW,
    payload: 'profile',
  };
};

// Bookmark actions
export const addBookmark = imageId => ({
  type: ACTION_TYPES.ADD_BOOKMARK,
  payload: imageId,
});

export const removeBookmark = imageId => ({
  type: ACTION_TYPES.REMOVE_BOOKMARK,
  payload: imageId,
});

// Account actions
export const signIn = user => ({
  type: ACTION_TYPES.SIGN_IN,
  payload: user,
});

export const signOut = () => ({
  type: ACTION_TYPES.SIGN_OUT,
  payload: {},
});

// Selection actions
export const selectGuide = guideId => ({
  type: ACTION_TYPES.SELECT_GUIDE,
  payload: guideId,
});

export const selectMarker = markerId => ({
  type: ACTION_TYPES.SELECT_MARKER,
  payload: markerId,
});

// Boolean actions
export const clickMarker = isClicked => ({
  type: ACTION_TYPES.MARKER_CLICK,
  payload: isClicked,
});

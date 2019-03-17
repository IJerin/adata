// src/reducers/landingPageViewReducer.js

import ACTION_TYPES from '../actions/actionTypes';

export default (state = 'home', action) => {
  switch (action.type) {
    case ACTION_TYPES.SWITCH_LANDING_PAGE_VIEW:
      return action.payload;
    default:
      return state;
  }
};

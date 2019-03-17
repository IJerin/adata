// src/reducers/menuContentViewReducer.js

import ACTION_TYPES from '../actions/actionTypes';

export default (state = 'about', action) => {
  switch (action.type) {
    case ACTION_TYPES.SWITCH_MENU_CONTENT_VIEW:
      return action.payload;
    default:
      return state;
  }
};

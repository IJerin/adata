// src/reducers/userReducer.js

import ACTION_TYPES from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.SIGN_IN:
    case ACTION_TYPES.SIGN_OUT:
      return action.payload;
    default:
      return state;
  }
};

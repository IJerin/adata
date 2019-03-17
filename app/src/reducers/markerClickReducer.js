// src/app/reducers/markerClickReducer.js

import ACTION_TYPES from '../actions/actionTypes';

export default (state = false, action) => {
  switch (action.type) {
    case ACTION_TYPES.MARKER_CLICK:
      return action.payload;
    default:
      return state;
  }
};

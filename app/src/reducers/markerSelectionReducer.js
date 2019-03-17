// src/app/reducers/markerSelectionReducer.js

import ACTION_TYPES from '../actions/actionTypes';

// Set default state 1 to select the first marker in the selected guide when redux if first run
export default (state = 1, action) => {
  switch (action.type) {
    case ACTION_TYPES.SELECT_MARKER:
      return action.payload;
    default:
      return state;
  }
};

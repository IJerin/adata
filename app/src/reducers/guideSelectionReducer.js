// src/reducers/guideSelectionReducer.js

import ACTION_TYPES from '../actions/actionTypes';

// TODO: Set default state to null when multiple guides exist
// Set default state to 1 to return a value when redux is first run
export default (state = 1, action) => {
  switch (action.type) {
    case ACTION_TYPES.SELECT_GUIDE:
      return action.payload;
    default:
      return state;
  }
};

// src/reducers/bookmarkReducer.js

import ACTION_TYPES from '../actions/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_BOOKMARK:
      if (!state.includes(action.payload)) {
        return [...state, action.payload];
      }
      return state;
    case ACTION_TYPES.REMOVE_BOOKMARK: {
      const idx = state.indexOf(action.payload);
      return [...state.slice(0, idx),
        ...state.slice(idx + 1)];
    }
    default:
      return state;
  }
};

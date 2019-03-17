// src/reducers/sceneReducer.js

import { ActionConst } from 'react-native-router-flux';

// Set default state to null to return a value when redux is first run
export default (state = {}, action) => {
  const { scene } = action;

  switch (action.type) {
    case ActionConst.FOCUS:
      return { ...state, scene };
    default:
      return state;
  }
};

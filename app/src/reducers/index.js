// src/reducers/index.js

import { combineReducers } from 'redux';

import SceneReducer from './sceneReducer';
import GuideReducer from './guideReducer';
import GuideSelectionReducer from './guideSelectionReducer';
import MarkerClickReducer from './markerClickReducer';
import MarkerSelectionReducer from './markerSelectionReducer';
import MenuContentViewReducer from './menuContentViewReducer';
import LandingPageViewReducer from './landingPageViewReducer';
import BookmarkReducer from './bookmarkReducer';
import UserReducer from './userReducer';

export default combineReducers({
  bookmarks: BookmarkReducer,
  guides: GuideReducer,
  landingPageView: LandingPageViewReducer,
  markerClicked: MarkerClickReducer,
  menuContentView: MenuContentViewReducer,
  selectedGuideId: GuideSelectionReducer,
  selectedMarkerId: MarkerSelectionReducer,
  sceneReducer: SceneReducer,
  user: UserReducer,
});

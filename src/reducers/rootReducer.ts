import { combineReducers } from 'redux';

import gitHubReducer from './gitHubReducer';
import webSocketReducer from './webSocketReducer';

const rootReducer = combineReducers({
  gitHub: gitHubReducer,
  webSocket: webSocketReducer,
});

export default rootReducer;

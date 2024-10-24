import { applyMiddleware, compose, legacy_createStore } from 'redux';
import rootReducer from './combineReducers';
import { thunk } from 'redux-thunk';

const composeEnhancers =
  process.env.REACT_APP_MODE === 'dev' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

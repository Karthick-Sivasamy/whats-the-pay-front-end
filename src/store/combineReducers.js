import { combineReducers } from 'redux';
import { loginReducer } from './Authorization/authReducers';

const rootReducer = combineReducers({
  loginData: loginReducer
  // Add other reducers here if you have more
});

export default rootReducer;

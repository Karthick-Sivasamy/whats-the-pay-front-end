import { ApiCycleState } from '../Globals/Utils';
import { LoginActionTypes } from './authActionTypes';

export const loginReducer = (state = ApiCycleState, { type, payload }) => {
  switch (type) {
    case LoginActionTypes.LOGIN:
      return { ...state, isLoading: true, isError: false };
    case LoginActionTypes.LOGIN_SUCCESS:
      return { ...state, response: payload, isLoading: false };
    case LoginActionTypes.LOGIN_FAILED:
      return { ...state, response: payload, isError: true, isLoading: false };
    default:
      return state;
  }
};

export const emailVerficationSignUpReducer = (state = ApiCycleState, { type, payload }) => {
  switch (type) {
    case LoginActionTypes.SEND_MAIL_VERIFICATION_FOR_SIGNUP:
      return { ...state, isLoading: true, isError: false };
    case LoginActionTypes.SEND_MAIL_VERIFICATION_FOR_SIGNUP_SUCCESS:
      return { ...state, response: payload, isLoading: false };
    case LoginActionTypes.SEND_MAIL_VERIFICATION_FOR_SIGNUP_FAILED:
      return { ...state, response: payload, isError: true, isLoading: false };
    default:
      return state;
  }
};

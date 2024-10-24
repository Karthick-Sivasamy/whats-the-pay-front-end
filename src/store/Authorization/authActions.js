import { ApiService } from '../../utils/apiService';
import { saveUserInfo } from '../../utils/globalUtils';
import { CatchApiReduxErrorGlobal, successDispatch } from '../Globals/Utils';
import { LoginActionTypes } from './authActionTypes';

export const loginAction = (params) => (dispatch) => {
  dispatch({ type: LoginActionTypes.LOGIN });
  CatchApiReduxErrorGlobal(
    async () => {
      const response = await ApiService().post('/user/login', params);
      if (response) {
        saveUserInfo({ userInfo: response?.data?.data?.user, token: response?.data?.token });
        dispatch(successDispatch(LoginActionTypes.LOGIN_SUCCESS, response.data));
      }
    },
    LoginActionTypes.LOGIN_FAILED,
    dispatch
  );
};

export const sendMailVerficationForSignUpAction = (params) => (dispatch) => {
  dispatch({ type: LoginActionTypes.SEND_MAIL_VERIFICATION_FOR_SIGNUP });
  CatchApiReduxErrorGlobal(
    async () => {
      const response = await ApiService().post('/user/send-signup-verification-mail', params);
      if (response) {
        saveUserInfo({ userInfo: response?.data?.data?.user, token: response?.data?.token });
        dispatch(
          successDispatch(LoginActionTypes.SEND_MAIL_VERIFICATION_FOR_SIGNUP_SUCCESS, response.data)
        );
      }
    },
    LoginActionTypes.SEND_MAIL_VERIFICATION_FOR_SIGNUP_FAILED,
    dispatch
  );
};

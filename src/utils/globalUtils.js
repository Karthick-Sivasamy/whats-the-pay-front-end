import Cookies from 'universal-cookie';

export const saveUserInfo = (data, rememberMe = true) => {
  const { userInfo, token } = data;
  if (rememberMe) {
    new Cookies().set('whats-the-pay-token', token);
    new Cookies().set('whats-the-pay-userData', JSON.stringify(userInfo));
  } else {
    sessionStorage.setItem('whats-the-pay-token', token);
    sessionStorage.setItem('whats-the-pay-userData', JSON.stringify(userInfo));
  }
};

export const getUserInfo = (returnObj = false) => {
  try {
    const userData = new Cookies().get('whats-the-pay-userData', { doNotParse: false });
    if (userData && userData?.email) {
      if (returnObj) {
        return userData;
      }
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const getJwtStatus = () => (new Cookies().get('whats-the-pay-token') ? true : false);

export const clearUserInfo = () => {
  new Cookies().remove('whats-the-pay-userData');
  new Cookies().remove('whats-the-pay-token');

  sessionStorage.removeItem('whats-the-pay-token');
  sessionStorage.removeItem('whats-the-pay-userData');
};

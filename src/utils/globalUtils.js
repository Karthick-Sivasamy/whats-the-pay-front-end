import Cookies from 'universal-cookie';

export const getLoggedUserInfoStatus = (returnObj = false) => {
  try {
    const userData = new Cookies().get('whats-the-pay-userData', { doNotParse: false });
    console.log(userData);
    if (userData && userData?.email) {
      if (returnObj) {
        return userData;
      }
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getJwtStatus = () => (new Cookies().get('whats-the-pay-token') ? true : false);

export const clearCookiesForLogout = () => {
  new Cookies().remove('whats-the-pay-userData');
  new Cookies().remove('whats-the-pay-token');
};

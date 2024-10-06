import validator from 'validator';

const onlyAlphaRegex = /^[a-zA-Z0]+$/;

export const checkValidName = (name) => {
  if (onlyAlphaRegex.test(name) && name.length) return true;
  return false;
};

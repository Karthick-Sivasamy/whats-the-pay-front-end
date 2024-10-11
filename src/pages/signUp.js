import React, { useState } from 'react';

import Cookies from 'universal-cookie';
import { ApiService } from '../utils/apiService';
import validator from 'validator';
import { toast } from 'react-toastify';
import { clearCookiesForLogout } from '../utils/globalUtils';

const SignUp = () => {
  const cookies = new Cookies();

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [verifyEmail, setVerifyEmail] = useState(false);

  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');

  const validatorsConfig = {
    name: (name) => validator.isAlpha(name),
    email: (email) => validator.isEmail(email),
    password: (password) => validator.isStrongPassword(password),
    confirmPassword: (confirmPassword) => inputData.password === confirmPassword
  };

  const checkIsFormValid = () => {
    let isValid = true;
    for (const key in inputData) {
      if (!inputData[key]) {
        isValid = false;
        setErrors((prevValue) => ({ ...prevValue, [key]: 'required*' }));
      }

      if (inputData[key].length && !validatorsConfig[key](inputData[key])) {
        isValid = false;
        setErrors((prevValue) => ({
          ...prevValue,
          [key]: key === 'confirmPassword' ? 'Passwords does not match' : `Invalid ${key}`
        }));
      }
    }
    return isValid;
  };

  const loginHandler = async () => {
    if (checkIsFormValid()) {
      try {
        const response = await ApiService().post('/user/send-verification-mail', {
          recipientMail: inputData.email,
          recipientName: inputData.name
        });

        if (response.status === 200) {
          sessionStorage.setItem('whats-the-pay-signup', JSON.stringify(inputData));
          setVerifyEmail(true);
          toast.success('Verfication code is sent to your email.', { position: 'bottom-center' });
        }
      } catch (error) {
        clearCookiesForLogout();
        toast.error('Signing up failed!', { position: 'bottom-center' });
        console.log(error);
      }
    }
  };

  const handleVerificationSubmit = async () => {
    if (verificationCode.length !== 4) {
      setVerificationError('Invalid verification code');
      return;
    }

    let { name, email, password, confirmPassword } = JSON.parse(
      sessionStorage.getItem('whats-the-pay-signup')
    );

    try {
      const response = await ApiService().post('/user/signup', {
        name,
        email,
        password,
        passwordConfirm: confirmPassword,
        verificationCode
      });

      if (response.data.status === 'success') {
        sessionStorage.removeItem('whats-the-pay-signup');
        cookies.set('whats-the-pay-token', response.data.token);
        cookies.set('whats-the-pay-userData', JSON.stringify(response.data?.data?.user));
        toast.success('User created successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (error) {
      setVerificationError('Incorrect verification code');
    }
  };

  return (
    <div className="px-4 pb-4 md:pb-8 md:pt-2 md:px-24 ">
      <div className="mx-0 xl:mx-16">
        {/* Upper Banner */}
        <div>
          {/* <h1 className="text-2xl font-semibold">Create New Account</h1> */}
          {/* <h1 className="text-sm md:text-lg mt-3">Welcome back! Select the below login methods.</h1> */}
        </div>

        {/* Login Container */}

        <div className="p-6 rounded-xl shadow-[0_0_30px_0_rgba(0,0,0,0.3)] flex w-full justify-evenly ">
          {/* Grid 1 */}
          <div className="hidden lg:flex flex-col justify-evenly items-center ">
            <h1 className="text-3xl font-semibold">Create New Account</h1>
            <img
              // src={LoginFormIllustrator}
              src={'http://localhost:8000/front-end-images/loginPage/loginFormImage.png'}
              alt="LoginFormIllustrator"
              className="h-96 w-96 object-contain"
            />
          </div>
          {/* Grid 2 */}
          {verifyEmail ? (
            <div className="flex flex-col items-start w-full lg:w-[40%] justify-center gap-3">
              <label className="text-base font-medium">
                Check your email and enter the 4 digit verification code.
              </label>
              <div className="flex items-end justify-between w-full">
                <label className="mt-5">Verification code</label>
                {verificationError && (
                  <p className="text-right text-sm text-red-600">{verificationError}</p>
                )}
              </div>
              <input
                className="w-full border p-2 outline-blue-500 rounded"
                placeholder="4 digit verification code"
                value={verificationCode}
                style={{
                  border: verificationError ? '1px solid red' : '1px solid #e5e7eb'
                }}
                onChange={(e) => {
                  let val = e.target.value;
                  if ((validator.isNumeric(val) && val.length < 5) || val === '') {
                    setVerificationCode(e.target.value);
                    setVerificationError('');
                  }
                  return;
                }}
              ></input>
              <button
                className="w-full p-2 bg-blue-500 text-white rounded hover:opacity-85 font-semibold"
                onClick={() => handleVerificationSubmit()}
              >
                Proceed
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-start w-full lg:w-[40%] justify-center ">
              <div className="flex items-end justify-between w-full">
                <label className="mt-5">Name</label>
                {errors.name && <p className="text-right text-sm text-red-600">{errors.name}</p>}
              </div>
              <input
                type="text"
                className="py-2 px-4 rounded-md outline-none w-full h-12 mt-2   "
                placeholder="Enter name "
                style={{
                  border: errors.name ? '1px solid red' : '1px solid #e5e7eb'
                }}
                value={inputData.name}
                onChange={(e) => {
                  if (errors.name) setErrors((prevValue) => ({ ...prevValue, name: '' }));
                  // setName(e.target.value);
                  setInputData((prevValue) => ({ ...prevValue, name: e.target.value }));
                }}
              ></input>
              <div className="flex items-end justify-between w-full">
                <label className="mt-5">Email Id</label>
                {errors.email && <p className="text-right text-sm text-red-600">{errors.email}</p>}
              </div>
              <input
                type="text"
                className="py-2 px-4 rounded-md outline-none w-full h-12 mt-2   "
                placeholder="Enter email id "
                style={{
                  border: errors.email ? '1px solid red' : '1px solid #e5e7eb'
                }}
                value={inputData.email}
                onChange={(e) => {
                  if (errors.email) setErrors((prevValue) => ({ ...prevValue, email: '' }));

                  setInputData((prevValue) => ({ ...prevValue, email: e.target.value }));
                }}
              ></input>

              {/* password container */}
              <div className="flex items-end justify-between w-full">
                <label className="mt-5">Password</label>
                {errors.password && (
                  <p className="text-right text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              <div
                className="mt-2 py-2 px-4 rounded-md  flex bg-white justify-between w-full h-12"
                style={{
                  border: errors.password ? '1px solid red' : '1px solid #e5e7eb'
                }}
              >
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter password"
                  className="flex-1 outline-none w-full"
                  value={inputData.password}
                  onChange={(e) => {
                    if (errors.password) setErrors((prevValue) => ({ ...prevValue, password: '' }));
                    setInputData((prevValue) => ({ ...prevValue, password: e.target.value }));
                  }}
                ></input>
                <p
                  className="flex-0 pl-2 cursor-pointer select-none text-blue-500 text-base font-medium "
                  onClick={() => inputData.password && setShowPass((prevValue) => !prevValue)}
                >
                  Show
                </p>
              </div>

              <div className="flex items-end justify-between w-full">
                <label className="mt-5">Confirm Password</label>
                {errors.confirmPassword && (
                  <p className="text-right text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
              <div
                className="mt-2 py-2 px-4 rounded-md  flex bg-white justify-between w-full h-12"
                style={{
                  border: errors.confirmPassword ? '1px solid red' : '1px solid #e5e7eb'
                }}
              >
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  placeholder="Enter password"
                  className="flex-1 outline-none w-full"
                  value={inputData.confirmPassword}
                  onChange={(e) => {
                    if (errors.confirmPassword)
                      setErrors((prevValue) => ({ ...prevValue, confirmPassword: '' }));
                    setInputData((prevValue) => ({
                      ...prevValue,
                      confirmPassword: e.target.value
                    }));
                  }}
                ></input>
                <p
                  className="flex-0 pl-2 cursor-pointer select-none text-blue-500 text-base font-medium "
                  onClick={() =>
                    inputData.confirmPassword && setShowConfirmPass((prevValue) => !prevValue)
                  }
                >
                  Show
                </p>
              </div>

              <div className=" flex items-center justify-between mt-5 w-full ">
                <div className="flex items-center gap-1 text-sm ">
                  <input type="checkbox" className="cursor-pointer" checked></input>
                  <p>Remember me</p>
                </div>
                <a href="#" className="text-blue-500 text-sm underline underline-offset-2 ">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                className="mt-4 bg-blue-500 text-white w-full py-2 rounded-md "
                onClick={() => loginHandler()}
              >
                Login
              </button>

              <div className=" flex items-center justify-center mt-5 text-sm w-full">
                Already have an account?
                <a className="text-blue-500 underline underline-offset-2 pl-1" href="/login">
                  Login
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;

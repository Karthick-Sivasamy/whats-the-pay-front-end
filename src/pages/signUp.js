import React, { useContext, useEffect, useState } from 'react';
import { Navigate, redirect, useNavigate } from 'react-router-dom';

import Cookies from 'universal-cookie';
import { ApiService } from '../utils/apiService';
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import { clearCookiesForLogout } from '../utils/globalUtils';
import { checkValidName } from '../utils/globalValidator';

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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  let loadingToast;

  const validInputDataConfig = {
    name: (name) => checkValidName(name)
  };

  const loginHandler = async () => {
    console.log('hi');
    for (const key in inputData) {
      console.log(key, inputData[key]);
      if (!inputData[key]) {
        setErrors((prevValue) => ({ ...prevValue, [key]: 'required*' }));
      }
    }

    if (validator.isEmail(email) && validator.isAlphanumeric(password)) {
      try {
        loadingToast = toast.loading('Please Wait');
        const response = await ApiService().post('/user/login', {
          email: email,
          password: password
        });

        const loadedConfig = {
          render: 'Successfully logged in!',
          type: 'success',
          isLoading: false,
          autoClose: true,
          closeButton: true
        };

        if (response.status == 200) {
          toast.update(loadingToast, loadedConfig);
          cookies.set('whats-the-pay-token', response.data.token);
          cookies.set('whats-the-pay-userData', JSON.stringify(response.data?.data?.user));
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
      } catch (error) {
        clearCookiesForLogout();
        console.log(error);
        toast.update(loadingToast, {
          render: 'Error logging in!',
          type: 'error',
          isLoading: false,
          autoClose: true,
          closeButton: true
        });
      }
    }

    return;
  };

  return (
    <div className="px-4 pb-4 md:pb-8 md:pt-2 md:px-24 ">
      <ToastContainer position="bottom-center" toastClassName="toastClass" />
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
          <div className="flex flex-col items-start w-full lg:w-[40%] justify-center ">
            <div className="flex items-end justify-between w-full">
              <label className="mt-5">Name</label>
              {errors.name && <p className="text-right text-sm text-red-600">{errors.name}</p>}
            </div>
            <input
              type="text"
              className="py-2 px-4 rounded-md outline-none w-full h-12 mt-2   "
              placeholder="Enter email id "
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
                  setInputData((prevValue) => ({ ...prevValue, confirmPassword: e.target.value }));
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
                <input type="checkbox" className="cursor-pointer" value={'hi'}></input>
                <p>Remember me</p>
              </div>
              <a href="#" className="text-blue-400 text-sm underline underline-offset-2 ">
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
        </div>
      </div>
    </div>
  );
};

export default SignUp;

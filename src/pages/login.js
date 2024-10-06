import React, { useContext, useEffect, useState } from 'react';
import { Navigate, redirect, useNavigate } from 'react-router-dom';

import Cookies from 'universal-cookie';
import { ApiService } from '../utils/apiService';
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import { clearCookiesForLogout } from '../utils/globalUtils';

const Login = () => {
  const cookies = new Cookies();

  const [showPass, setShowPass] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    email: false,
    password: false
  });

  let loadingToast;

  const loadedSuccessConfig = {
    render: 'Successfully logged in!',
    type: 'success',
    isLoading: false,
    autoClose: true,
    closeButton: true
  };

  const loginHandler = async () => {
    if (!validator.isEmail(email.trim()) || !validator.isAlphanumeric(password.trim())) {
      if (!email || !password) {
        setErrors({ email: !Boolean(email.length), password: !Boolean(password.length) });
        return;
      }

      setErrors({ password: true, email: true });
    }
    if (validator.isEmail(email) && validator.isAlphanumeric(password)) {
      try {
        loadingToast = toast.loading('Please Wait');
        const response = await ApiService().post('/user/login', {
          email: email,
          password: password
        });

        if (response.status == 200) {
          toast.update(loadingToast, loadedSuccessConfig);
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
          render: 'Login failed! Invalid Email / Password',
          type: 'error',
          isLoading: false,
          autoClose: true,
          closeButton: true
        });
        setEmail('');
        setPassword('');
      }
    }

    return;
  };

  return (
    <div className="px-4 py-4 md:py-8 md:px-24 ">
      <ToastContainer position="bottom-center" />
      <div className="mx-0 xl:mx-16">
        {/* Upper Banner */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Login to your Account</h1>
          <h1 className="text-sm md:text-lg mt-3">Welcome back! Select the below login methods.</h1>
        </div>

        {/* Login Container */}

        <div className="mt-2 md:mt-10 p-6 rounded-xl shadow-[0_0_30px_0_rgba(0,0,0,0.3)] flex w-full justify-evenly ">
          {/* Grid 1 */}
          <div className="hidden lg:block">
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
              <label className="mt-5">Email Id</label>
              {errors.email && (
                <p className="text-right text-sm text-red-600">
                  {email ? 'Invalid email address' : 'Required*'}
                </p>
              )}
            </div>
            <input
              type="text"
              className="py-2 px-4 rounded-md outline-none w-full h-12 mt-2   "
              placeholder="Enter email id "
              style={{
                border: errors.email ? '1px solid red' : '1px solid #e5e7eb'
              }}
              value={email}
              onChange={(e) => {
                if (errors.email) setErrors((prevValue) => ({ ...prevValue, email: false }));
                setEmail(e.target.value);
              }}
            ></input>

            {/* password container */}
            <div className="flex items-end justify-between w-full">
              <label className="mt-5">Confirm Password</label>
              {errors.password && (
                <p className="text-right  text-sm text-red-600">
                  {password ? 'Invalid Password' : 'Required*'}
                </p>
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
                value={password}
                onChange={(e) => {
                  if (errors.password)
                    setErrors((prevValue) => ({ ...prevValue, password: false }));
                  setPassword(e.target.value);
                }}
              ></input>
              <p
                className="flex-0 pl-2 cursor-pointer select-none text-blue-500 text-base font-medium "
                onClick={() => password && setShowPass((prevValue) => !prevValue)}
              >
                Show
              </p>
            </div>

            <div className=" flex items-center justify-between mt-5 w-full ">
              <div className="flex items-center gap-1 text-sm ">
                <input type="checkbox" className="cursor-pointer"></input>
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
              Don't have an account?
              <a className="text-blue-500 underline underline-offset-2 pl-1" href="/signup">
                Create account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

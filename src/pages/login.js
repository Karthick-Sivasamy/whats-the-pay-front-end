import React, { useState } from 'react';

import LoginFormIllustrator from '../assets/illustrations/loginFormImage.png';

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const [password, setPassword] = useState('');

  return (
    <div className="px-4 py-4 md:py-8 md:px-24">
      <div className="mx-0 xl:mx-16">
        {/* Upper Banner */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Login to your Account
          </h1>
          <h1 className="text-base md:text-lg mt-3">
            Welcome back! Select the below login methods.
          </h1>
        </div>

        {/* Login Container */}
        <div className="mt-2 md:mt-10 p-6 rounded-xl shadow-lg flex w-full gap-5 ">
          {/* Grid 1 */}
          <div className="flex flex-col items-start w-[40%]">
            <label>Email ID </label>
            <input
              type="text"
              className="py-2 px-4 border rounded-md  outline-none w-full "
              placeholder="Enter email id "
            ></input>

            {/* password container */}
            <label className="mt-3">Password</label>
            <div className="py-2 px-4 border rounded-md  flex bg-white justify-between w-full">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Enter password"
                className="flex-1 outline-none w-full"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <p
                className="flex-0 pl-2 cursor-pointer select-none text-blue-500 text-base font-medium "
                onClick={() =>
                  password && setShowPass((prevValue) => !prevValue)
                }
              >
                Show
              </p>
            </div>

            <div className=" flex items-center justify-between mt-2 w-full ">
              <div className="flex items-center gap-1 text-sm ">
                <input type="checkbox"></input>
                <p>Remember me</p>
              </div>
              <a href="#" className="text-blue-400 text-sm ">
                Forgot password?
              </a>
            </div>
            <div className=" flex items-center justify-center mt-2 text-sm w-full">
              Don't have an account?
              <a className="text-blue-500 underline underline-offset-2 pl-1">
                Register
              </a>
            </div>
          </div>

          {/* Grid 2 */}
          <div>
            <img src={LoginFormIllustrator} alt="LoginFormIllustrator" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

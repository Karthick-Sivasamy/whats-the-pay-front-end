import React, { useEffect, useState } from 'react';
// import Cookies from 'universal-cookie';
// import { GlobalContext } from '../Contexts/GlobalContextProvider';
import { getLoggedUserInfoStatus, getJwtStatus, clearCookiesForLogout } from './globalUtils';

// Local Imports

const Header = () => {
  const HeaderLinks = [
    {
      name: 'Home',
      link: '/home',
      iconClass: 'fa-solid fa-house'
    },
    {
      name: 'Find Jobs',
      link: '/find-jobs',
      iconClass: 'fa-solid fa-magnifying-glass'
    },
    {
      name: 'Employers',
      link: '/employers',
      iconClass: 'fa-solid fa-house'
    },
    {
      name: 'Admin',
      link: '/admin',
      iconClass: 'fa-solid fa-house'
    },
    {
      name: 'About Us',
      link: '/about-us',
      iconClass: 'fa-solid fa-house'
    }
  ];

  const [showSideBar, setShowSideBar] = useState(false);

  const [userData, setUserData] = useState(null);

  console.log(userData);

  useEffect(() => {
    if (getJwtStatus() && getLoggedUserInfoStatus()) {
      setUserData(getLoggedUserInfoStatus(true));
    } else {
      setUserData(null);
    }
  }, []);

  return (
    <>
      <div
        className="h-full fixed z-50 top-0 right-0  bg-slate-300  overflow-x-hidden transition-width duration-300"
        style={{ width: showSideBar ? '100%' : 0 }}
      >
        <div
          onClick={() => setShowSideBar(false)}
          className="w-full flex items-center justify-end pt-6 px-8 gap-4"
        >
          {userData ? (
            <button
              className="py-2 px-4 bg-blue-500 text-white rounded-md"
              onClick={() => {
                clearCookiesForLogout();
                window.location.reload();
              }}
            >
              Logout
            </button>
          ) : (
            <a href="/login" className="py-2 px-4 bg-blue-500 text-white rounded-md ">
              Login
            </a>
          )}
          <i className="fa-solid fa-close text-2xl cursor-pointer hover:bg-gray-400 p-1 px-2  transition-all duration-400 "></i>
        </div>
        <div
          className="h-full grid grid-cols-2 grid-rows-5 p-2 place-items-center  transition-opacity delay-300 duration-300 ease-in-out gap-3"
          style={{
            opacity: showSideBar ? 1 : 0
          }}
        >
          {showSideBar &&
            HeaderLinks.map((item, index) => (
              <a
                href={item.link}
                key={index}
                className="hover:text-white hover:scale-105 text font-medium flex flex-col justify-center items-center gap-2  bg-blue-400 h-full w-full rounded-lg transition-scale duration-300 delay-75 ease-in-out text-sm md:text-base"
              >
                <i className={item.iconClass}></i>
                {item.name}
              </a>
            ))}
        </div>
      </div>
      <nav className="py-4 px-4 lg:px-8 xl:px-36 flex items-center justify-between">
        <div className="flex  items-center gap-4">
          <img
            src="https://wallpapercave.com/fuwp/uwp4224146.jpeg"
            alt="logo"
            className="w-10 h-10 object-cover rounded-full"
          />
          <p className="text-blue-600 font-semibold textsm lg:text-xl ">What's-The-Pay</p>
        </div>
        <div className="text-sm hidden lg:flex gap-8 xl:gap-16 ">
          {HeaderLinks.map((item, index) => (
            <a href={item.link} key={index} className="hover:text-blue-600 font-medium ">
              {item.name}
            </a>
          ))}
        </div>
        <div className="gap-3 xl:gap-6 hidden lg:flex items-center">
          <a
            className="text-center cursor-pointer text-sm text-blue-600 border p-3 w-[100px] rounded font-semibold border-blue-600 hover:opacity-90 hover:shadow-md"
            href="#"
          >
            Contact Us
          </a>
          {userData && (
            <img
              src={`${process.env.REACT_APP_API_SERVER_ORIGIN}/images/users/${userData.photo}`}
              alt="userPhoto"
              className="h-10 w-10 object-contain rounded-full cursor-pointer hover:shadow-lg hover:scale-105"
            />
          )}
          {userData ? (
            <button
              className="py-2 px-4 bg-blue-500 text-white rounded-md"
              onClick={() => {
                clearCookiesForLogout();
                window.location.reload();
              }}
            >
              Logout
            </button>
          ) : (
            <a
              className="text-sm text-center cursor-pointer text-white p-3 w-[100px] rounded font-semibold bg-blue-600 hover:opacity-90"
              href="/login"
            >
              Login
            </a>
          )}
        </div>

        <div className="flex items-center gap-6 lg:hidden">
          {/* {new Cookies().get('token') && getLoggedUserInfoStatus() && (
            <i className="fa-solid fa-user-circle text-3xl text-blue-500 cursor-pointer lg:hidden" />
          )} */}
          {userData && (
            <img
              src={`${process.env.REACT_APP_API_SERVER_ORIGIN}/images/users/${userData.photo}`}
              alt="userPhoto"
              className="h-10 w-10 object-contain rounded-full  cursor-pointer"
            />
          )}

          <i
            className=" fa-solid fa-bars text-2xl cursor-pointer hover:opacity-75"
            onClick={() => {
              console.log('Im Logging');
              setShowSideBar(true);
            }}
          ></i>
        </div>
      </nav>
    </>
  );
};

export default Header;

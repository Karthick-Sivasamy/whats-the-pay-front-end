import React from 'react';
import Header from './header';
import { ToastContainer } from 'react-toastify';

const Layout = ({ children }) => {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        toastClassName="toastClass"
        autoClose={5000}
        hideProgressBar
      />
      <Header />
      {children}
    </>
  );
};

export default Layout;

import React from 'react';
import GlobalContextProvider from '../Contexts/GlobalContextProvider';
import Header from './header';
import { ToastContainer } from 'react-toastify';

const Layout = ({ children }) => {
  return (
    <GlobalContextProvider>
      <ToastContainer position="bottom-center" toastClassName="toastClass" autoClose={5000} />
      <Header />
      {children}
    </GlobalContextProvider>
  );
};

export default Layout;

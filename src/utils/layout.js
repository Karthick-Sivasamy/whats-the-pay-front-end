import React from 'react';
import GlobalContextProvider from '../Contexts/GlobalContextProvider';
import Header from './header';

const Layout = ({ children }) => {
  return (
    <GlobalContextProvider>
      <Header />
      {children}
    </GlobalContextProvider>
  );
};

export default Layout;

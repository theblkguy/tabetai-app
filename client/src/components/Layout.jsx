import React from 'react';
import Navbar from './NavBar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  );
}

export default Layout;
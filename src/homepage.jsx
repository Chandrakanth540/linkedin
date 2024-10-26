import { NavLink } from 'react-router-dom';
import React from 'react';
import Headtitle from './headtitle';
import MainFooter from './footer';
const Homepage = () => {
  return (
    <>
      <div>
        <Headtitle />
        <div className="header-btns">
          <NavLink
            to="login"
            id="header-btn1"
            className={({ isActive }) => (isActive ? 'active-box' : {})}
          >
            Login
          </NavLink>
          <NavLink
            to="register"
            id="header-btn2"
            className={({ isActive }) => (isActive ? 'active-box' : {})}
          >
            Register
          </NavLink>
        </div>
      </div>
    </>
  );
};
export default Homepage;

import React from 'react';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <div className="navbar">
      {user ? (
        <>
          <Link to="/"> Home </Link>
          <Link to="/profile"> Profile </Link>
          <Link to="/" onClick={onLoggedOut}> Logout</Link>
        </>
      ) : (
        <>
          <Link to="/login"> Login </Link>
          <Link to="/signup"> Signup </Link>
        </>
      )}
    </div>
  );
};

export default NavigationBar;
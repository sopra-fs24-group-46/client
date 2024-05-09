import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import PropTypes from "prop-types";


export const LoginGuard = () => {

  //If the user has no token inside localStorage, the user will go back to the login 
  if (!localStorage.getItem("token")) {
    
    return <Outlet />;
  }
  

  //If the user already has a token he will be navigated to the profile page
  return <Navigate to="/profile" replace />;
};

LoginGuard.propTypes = {
  children: PropTypes.node
}
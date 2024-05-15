import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export const IsNoUserGuard = () => {
  if (localStorage.getItem("token") && localStorage.getItem("id")) {
    // If token exists, redirect to '/profile'
    return <Navigate to="/profile" replace />;
  }

  // If no token, render the child components
  return <Outlet />;
};

IsNoUserGuard.propTypes = {
  children: PropTypes.node
};

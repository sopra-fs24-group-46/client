import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export const RegisterGuard = () => {
  if (localStorage.getItem("token")) {
    // If token exists, redirect to '/profile'
    return <Navigate to="/profile" replace />;
  }

  // If no token, render the child components
  return <Outlet />;
};

RegisterGuard.propTypes = {
  children: PropTypes.node
};

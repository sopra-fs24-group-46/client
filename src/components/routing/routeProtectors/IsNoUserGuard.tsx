import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { Storage } from "helpers/LocalStorageManagement";

export const IsNoUserGuard = () => {
  const { id, token } = Storage.retrieveUser();
  if (id && token) {
    // If token exists, redirect to '/profile'
    return <Navigate to="/profile" replace />;
  }

  // If no token, render the child components
  return <Outlet />;
};

IsNoUserGuard.propTypes = {
  children: PropTypes.node
};

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { Storage } from "helpers/LocalStorageManagement";

export const IsUserGuard = () => {
  const { id, token } = Storage.retrieveUser();
  if (!id || !token) {
    return <Navigate to="/home" replace />;
  }
  
  return <Outlet />;
};

IsUserGuard.propTypes = {
  children: PropTypes.node
};

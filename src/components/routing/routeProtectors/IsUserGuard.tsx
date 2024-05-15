import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export const IsUserGuard = () => {
  if (!localStorage.getItem("token") || !localStorage.getItem("id")) {
    return <Navigate to="/home" replace />;
  }
  
  return <Outlet />;
};

IsUserGuard.propTypes = {
  children: PropTypes.node
};

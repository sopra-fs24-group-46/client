
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { Storage } from "helpers/LocalStorageManagement";
import  RedirectToGame  from "components/ui/RedirectToGame";

const IsNotInGame_Guard = () => {
  const { gameId, playerId } = Storage.retrieveGameIdAndPlayerId();
  if (gameId && playerId) {
    return (
      <div>
        <RedirectToGame />
        <Outlet />
      </div>
    );
  }
  
  return <Outlet />;
};

export default IsNotInGame_Guard;
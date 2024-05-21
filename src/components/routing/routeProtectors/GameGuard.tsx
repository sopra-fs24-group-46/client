import React, {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";
import PropTypes from "prop-types";
import { Storage } from "helpers/LocalStorageManagement";
import { getGameState } from "components/game/GameApi";

/**
 * routeProtectors interfaces can tell the router whether or not it should allow navigation to a requested route.
 * They are functional components. Based on the props passed, a route gets rendered.
 * In this case, if the user is authenticated (i.e., a token is stored in the local storage)
 * <Outlet /> is rendered --> The content inside the <GameGuard> in the App.js file, i.e. the user is able to access the main app.
 * If the user isn't authenticated, the components redirects to the /login screen
 * @Guard
 * @param props
 */
export const GameGuard = () => {
  const [gameId, setGameId] = useState("some");
  const [playerId, setPlayerId] = useState("some");

  useEffect(() => {
    const checkGameState = async () => {
      const gameState = await getGameState();

      //If gameState is closed, redirect to profile
      if(!gameState || gameState.gameState === "CLOSED") {
        Storage.removeGameIdAndPlayerId();
        window.location.href = "/profile";
        return;
      }

      const { gameId, playerId } = Storage.retrieveGameIdAndPlayerId();
      setGameId(gameId);
      setPlayerId(playerId);
    }

    checkGameState();

    const popListener = () => {
      window.addEventListener("popstate", () => {
        checkGameState();
      });
    };
    popListener();
    return () => {
      window.removeEventListener("popstate", popListener);
    };
  }, []);

  if (gameId && playerId) {
    
    return <Outlet />;
  }
  
  return <Navigate to="/profile" replace />;
};

GameGuard.propTypes = {
  children: PropTypes.node
};
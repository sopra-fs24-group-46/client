
import React, { useEffect, useState } from "react";
import {  Outlet } from "react-router-dom";
import { Storage } from "helpers/LocalStorageManagement";
import  RedirectToGame  from "components/ui/RedirectToGame";
import { getGameState } from "components/game/GameApi";
import RuleLink from "components/ui/RuleLink";

const IsNotInGame_Guard = () => {
  const [gameId, setGameId] = useState(null);
  const [playerId, setPlayerId] = useState(null);

  useEffect(() => {
    const checkGameState = async () => {
      const gameState = await getGameState();

      if(!gameState || gameState.gameState === "CLOSED") {
        Storage.removeGameIdAndPlayerId();
        return;
      }

      const { gameId, playerId } = Storage.retrieveGameIdAndPlayerId();
      setGameId(gameId);
      setPlayerId(playerId);
    }

    checkGameState();
  }, [])

  if (gameId && playerId) {
    return (
      <div>
        <RuleLink />
        <RedirectToGame />
        <Outlet />
      </div>
    );
  }
  
  return (
  <div>
    <RuleLink />
    <Outlet />
  </div>
  );
};

export default IsNotInGame_Guard;
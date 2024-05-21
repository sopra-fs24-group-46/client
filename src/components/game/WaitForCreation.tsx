import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import { getGameState } from "components/game/GameApi";
import { useError } from "components/ui/ErrorContext";

//styling
import "styles/views/Header.scss";
import "styles/views/Authentication.scss";
import { Storage } from "helpers/LocalStorageManagement";


const WaitForCreation = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  
  useEffect(() => {
    const { gameId, playerId } = Storage.retrieveGameIdAndPlayerId();
    const backToGame = async () => {
      const gameState = await getGameState();
      if (gameState && gameState.gameState !== "SETUP") {
        navigate("/game/" + gameId);
      }
    }
    
    backToGame();
    const interval = setInterval(backToGame, 1000);
    return () => clearInterval(interval);
  }, []);

  const leave = () => {
    Storage.removeGameIdAndPlayerId();
    navigate("/home");
  }

  return (
    <BaseContainer>
      <div className="authentication container">
        <div className="authentication form" style={{ textAlign: "center", color : "white"}}>
          <h2>Please wait until the host has selected the game settings</h2>
          <p>Do you want to leave the game?</p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Button
              onClick={leave}
            >
              leave game
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default WaitForCreation;
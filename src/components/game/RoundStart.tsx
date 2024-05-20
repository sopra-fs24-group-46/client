import React, { useState, useEffect } from "react";
import { Spinner } from "components/ui/Spinner";
import { PowerUpBar, PowerUpOverlay } from "components/ui/PowerUp";
import { getGameView } from "./GameApi";
import { usePowerUp } from "helpers/api";
import { useError } from "components/ui/ErrorContext";
import { Storage } from "helpers/LocalStorageManagement";
import "styles/views/Round.scss";
import "styles/views/GameViewContainer.scss";
import "styles/views/FancyBackground.scss";

const RoundStart = () => {

  const { showError } = useError();
  // State variables for game data
  const [gameInfo, setGameInfo] = useState(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentLocationName, setCurrentLocationName] = useState(null);
  const [powerUpInUse, setPowerUpInUse] = useState(null);
  const [usedPowerUps, setUsedPowerUps] = useState([]);
  // Add more state variables as needed

  useEffect(() => {
    async function init() {
      try {

        const {gameId, playerId} = Storage.retrieveGameIdAndPlayerId();
        const data = await getGameView();

        setGameInfo(data);
        setCurrentRound(data.currentRound);
        setCurrentLocationName(data.currentQuestion.location_name);
        setUsedPowerUps(data.usedPowerUps[playerId] ?? []);

      } catch (error) {
        console.error("Error fetching game view:", error);
      }
    }

    init();
  }, []);
  
  useEffect(() => {
    if (powerUpInUse) {
      usePowerUp(powerUpInUse, showError);
    }
  }, [powerUpInUse]);

  let content = <Spinner />;
  if (gameInfo) {
    content = (
            <div className="round question">{currentLocationName}</div>
    );
  }

  return (
    <div className="game_view_container" >
      <div  style={{zIndex: 2}}>
        <PowerUpOverlay powerUp={powerUpInUse} />
        <h1 className="header1 roundStart">Round {currentRound}</h1>
        <div className="round container">
          <div className="round text-container">
            <div className="round text">Try to find this Mountain/Lake:</div>
            {content}
          </div>
          <PowerUpBar
            powerUpInUse={powerUpInUse}
            disabledList={usedPowerUps}
            disableAll={powerUpInUse !== null}
            setPowerUpInUse={setPowerUpInUse}
          />
        </div>
      </div>
        <div className="area" >
          <ul className="circles">
                  <li></li>
                  <li><div className="centering">{':O'}</div></li>
                  <li><div className="centering">{':)'}</div></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
          </ul>
        </div >
  </div>
  );
};


export default RoundStart;

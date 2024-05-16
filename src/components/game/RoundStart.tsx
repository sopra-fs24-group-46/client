import React, { useState, useEffect } from "react";
import BaseContainer from "components/ui/BaseContainer";
import ProgressBar from "components/ui/ProgressBar";
import { Spinner } from "components/ui/Spinner";
import "styles/views/Round.scss";
import "styles/ui/Progressbar.scss";
import { PowerUpBar, PowerUpOverlay } from "components/ui/PowerUp";
import PropTypes from "prop-types";
import { getGameView } from "./GameApi";
import "styles/views/GameViewContainer.scss";
import { usePowerUp } from "helpers/api";
import "styles/views/FancyBackground.scss";
import { useError } from "components/ui/ErrorContext";
import { Storage } from "helpers/LocalStorageManagement";

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
            <div>{currentLocationName}</div>
    );
  }

  return <div className="game_view_container" >
      <div  style={{zIndex: 2}}>
        <PowerUpOverlay powerUp={powerUpInUse} />
        <h1 className="header title1">
          Round {currentRound}
        </h1>
        <div className="round container">
          <div className="round text_container">
            <div>Try to find this Mountain:</div>
            {content}
          </div>
          <PowerUpBar
            powerUpInUse={powerUpInUse}
            disabledList={usedPowerUps}
            disableAll={powerUpInUse !== null}
            setPowerUpInUse={setPowerUpInUse}
          />
          {/* <ProgressBar
            durationInSeconds={4}
            onFinish={() => { }}
          /> */}
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
  </div>;
};


export default RoundStart;

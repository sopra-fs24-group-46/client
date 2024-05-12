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

const RoundStart = () => {

  // State variables for game data
  const [gameInfo, setGameInfo] = useState(null);
  const [currentRound, setCurrentRound] = useState(null);
  const [currentLocationName, setCurrentLocationName] = useState(null);
  const [powerUpInUse, setPowerUpInUse] = useState(null);
  const [usedPowerUps, setUsedPowerUps] = useState([]);
  // Add more state variables as needed

  useEffect(() => {
    async function init() {
      try {
        const playerId = localStorage.getItem("playerId");
        const gameId = localStorage.getItem("gameId");

        const devData = JSON.parse(localStorage.getItem("devGameView"));
        const data = (gameId !== null && playerId !== null) ?
          await getGameView() :
          devData;
          
          

        setGameInfo(data);
        setCurrentRound(data.currentRound);
        setCurrentLocationName(data.currentQuestion.location_name);
        setPowerUpInUse(data.powerUps[playerId] ?? null);
        setUsedPowerUps(data.usedPowerUps[playerId] ?? []);

      } catch (error) {
        console.error("Error fetching game view:", error);
      }
    }

    init();
  }, []);

  let content = <Spinner />;
  if (gameInfo) {
    content = (
      <div>
        <PowerUpOverlay powerUp={powerUpInUse} />
        <h1 className="header title1">
          Round {currentRound}
        </h1>
        <div className="round container">
          <div className="round text_container">
            <div>Try to find this Mountain:</div>
            <div>{currentLocationName}</div>
          </div>
          <PowerUpBar
            inUseList={[powerUpInUse]}
            disabledList={usedPowerUps}
            disableAll={powerUpInUse !== null}
          />
          <ProgressBar
            durationInSeconds={4}
            onFinish={() => { }}
          />
        </div>
      </div>
    );
  }

  return <div className="game_view_container">{content}</div>;
};

RoundStart.propTypes = {
  setRoundState: PropTypes.func.isRequired,
};

export default RoundStart;

import React, { useState, useEffect, useCallback } from "react";
import { PowerUpOverlay } from "components/ui/PowerUp";
import PropTypes from "prop-types";

import { getGameView } from "./GameApi";
import "styles/views/GameViewContainer.scss";
import { Storage } from "helpers/LocalStorageManagement";
import { useError } from "components/ui/ErrorContext";

import "styles/views/Round.scss";
import "styles/views/Guess.scss";
import "styles/ui/MapRevealLeaderboard.scss";

// the hooks file has some of the logic that is used in this file

const Guessing = ({ setJokerData, numberOfRounds}) => {
  const {showError} = useError();

  const [currentRound, setCurrentRound] = useState("");
  const [powerUpInUse, setPowerUpInUse] = useState(null);
  const [currentLocationName, setCurrentLocationName] = useState(null);

  useEffect(() => {
    
    async function init() {
      try {
        const {gameId, playerId} = Storage.retrieveGameIdAndPlayerId();
        const data = await getGameView();
        
        setCurrentRound(data.currentRound);
        setCurrentLocationName(data.currentQuestion.location_name);
        setPowerUpInUse(data.powerUps[playerId]);


        const jokerInUse = (data.powerUps[playerId]) === "JOKER" ? true : false;
        const jokerData = {joker: jokerInUse, center: [data.currentQuestion.location.x, data.currentQuestion.location.y]}
        setJokerData(jokerData);
        console.log(jokerData);

      } catch (error) {
        console.error("Error fetching game view:", error);
      }
    }

    init();
  }, []);

  return (
    <div className="game_view_container">
        <PowerUpOverlay powerUp={powerUpInUse} />
        <div className="guess container">
            <div className="guess round-number">{currentRound}/{numberOfRounds}</div>
          <div className="guess text-container" >
            <div className="guess text">
              Find:
            </div>
            <div className="guess question">{currentLocationName}</div>
          </div>
        </div>
      </div>
  );
};

Guessing.propTypes = {
  setJokerData: PropTypes.func.isRequired,
  numberOfRounds: PropTypes.number
};

export default Guessing;

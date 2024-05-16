import React, { useState, useEffect, useCallback } from "react";
import { PowerUpOverlay } from "components/ui/PowerUp";
import PropTypes from "prop-types";

import "styles/views/Question.scss";
import "styles/ui/Progressbar.scss";
import { getGameView } from "./GameApi";
import "styles/views/GameViewContainer.scss";
import { Storage } from "helpers/LocalStorageManagement";
import { useError } from "components/ui/ErrorContext";

// the hooks file has some of the logic that is used in this file

const Guessing = ({ setJokerData }) => {
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
      <div className="map question_container">
        <div className="map text1">Round {currentRound}</div>
        <div className="map text2">
          Find mountain: {currentLocationName}
        </div>
        <div className="map text3">
          Select a location by clicking on the map.
        </div>
      </div>
    </div>
  );
};

Guessing.propTypes = {
  setJokerData: PropTypes.func.isRequired,
};

export default Guessing;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import ProgressBar from "components/ui/ProgressBar";
import MapBoxComponent from "components/ui/MapBoxComponent";
import { PowerUpOverlay } from "components/ui/PowerUp";
import { getDomain } from "helpers/getDomain";
import {
  fetchGameView,
  handleAnswerSubmit,
  fetchGameData,
} from "../views/hooks";
import PropTypes from "prop-types";
import {api} from "helpers/api";

import "styles/views/Question.scss";
import "styles/ui/Progressbar.scss";
import { getGameView, submitAnswer } from "./GameApi";
import "styles/views/GameViewContainer.scss";

// the hooks file has some of the logic that is used in this file

const Guessing = () => {
  const gameId = localStorage.getItem("gameId");

  const [currentRound, setCurrentRound] = useState("");
  const [powerUpInUse, setPowerUpInUse] = useState(null);
  const [currentLocationName, setCurrentLocationName] = useState(null);

  const guessingTimer = parseInt(
    localStorage.getItem("guessingTime") || "0",
    10
  );

  useEffect(() => {
    
    async function init() {
      try {
        const playerId = localStorage.getItem("playerId");
        const gameId = localStorage.getItem("gameId");

        const devData = JSON.parse(localStorage.getItem("devGameView"));
        const data = (gameId !== null && playerId !== null) ?
          await getGameView() :
          devData;
        
        setCurrentRound(data.currentRound);
        setCurrentLocationName(data.currentQuestion.location_name);
        setPowerUpInUse(data.powerUps[playerId]);

      } catch (error) {
        console.error("Error fetching game view:", error);
      }
    }

    init();
    const intervalId = setInterval(() => submitAnswer(gameId), 500);
    return () => clearInterval(intervalId);
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
      <ProgressBar
        durationInSeconds={guessingTimer - 2}
        onFinish={() => { }}
      />
    </div>
  );
};

Guessing.propTypes = {
  setRoundState: PropTypes.func.isRequired,
};
export default Guessing;

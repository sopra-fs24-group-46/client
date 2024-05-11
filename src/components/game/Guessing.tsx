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

// the hooks file has some of the logic that is used in this file

const Guessing = ({ setRoundState: setRoundState }) => {
  const navigate = useNavigate();
  const gameId = localStorage.getItem("gameId");
  const currentQuestionLocation = localStorage.getItem(
    "currentQuestionLocation"
  );

  const [gameState, setGameState] = useState("");
  const [roundStateL, setRoundStateL] = useState("");
  const [currentRound, setCurrentRound] = useState("");
  const [powerUpInUse, setPowerUpInUse] = useState(null);

  const guessingTimer = parseInt(
    localStorage.getItem("guessingTime") || "0",
    10
  );

  const fetchGameViewCallback = useCallback(
    () => fetchGameView(gameId, setGameState, setRoundStateL, setCurrentRound),
    [gameId]
  );

  useEffect(() => {
    const interval = setInterval(fetchGameViewCallback, 15000);
    return () => clearInterval(interval);
  }, [fetchGameViewCallback]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`game/${gameId}/getView`);
        const data = response.data;
        const playerId = localStorage.getItem("playerId");
        setPowerUpInUse(data.powerUps[playerId]);

        if (data.roundState === "MAP_REVEAL") {
          // navigate(
          //   `/game/${gameId}/round/${localStorage.getItem("currentRound")}/mapReveal`
          // );
          setRoundState(data.roundState);
        }
        // setRoundState(newRoundState);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const intervalId = setInterval(fetchData, 500);
    return () => clearInterval(intervalId);
  }, []);

  const handleFinish = useCallback(() => handleAnswerSubmit(gameId), [gameId]);

  return (
    <BaseContainer>
      <PowerUpOverlay powerUp={powerUpInUse} />
      <div className="map question_container">
        <div className="map text1">Round {currentRound}</div>
        <div className="map text2">
          Find mountain: {localStorage.getItem("currentLocationName")}
        </div>
        <div className="map text3">
          Select a location by clicking on the map.
        </div>
      </div>
      <div className="map container">
        <MapBoxComponent
          currentQuestionLocation={currentQuestionLocation}
          reveal={0}
          guessesMapReveal={[]}
        />
      </div>
      <ProgressBar
        durationInSeconds={guessingTimer - 2}
        onFinish={handleFinish}
      />
    </BaseContainer>
  );
};

Guessing.propTypes = {
  setRoundState: PropTypes.func.isRequired,
};
export default Guessing;

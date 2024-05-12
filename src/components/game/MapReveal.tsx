import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { useNavigate } from "react-router-dom";
import { api } from "helpers/api";
import BaseContainer from "components/ui/BaseContainer";
import ProgressBar from "components/ui/ProgressBar";
import MapBoxComponent from "../ui/MapBoxComponent";
import "styles/views/Question.scss";
import "styles/ui/Progressbar.scss";
import { getDomain } from "helpers/getDomain";
import { PowerUpOverlay } from "components/ui/PowerUp";
import { MapRevealLeaderboard } from "components/ui/MapRevealLeaderboard";
import "styles/views/GameViewContainer.scss";
import { getGameView } from "./GameApi";

const MapReveal = ({ setRoundState }) => {
  const navigate = useNavigate();
  const mapboxAccessToken =
    "pk.eyJ1IjoiYW1lbWJhZCIsImEiOiJjbHU2dTF1NHYxM3drMmlueDV3ZGtvYTlvIn0.UhwX7hVWfe4fJA-cjCX70w";
  let isTimerFinished = false;
  const currentRound = localStorage.getItem("currentRound");
  const [powerUpInUse, setPowerUpInUse] = useState(null);
  const [currentQuestionLocation, setCurrentQuestionLocation] = useState(null);
  const [playerAnswersArray, setPlayerAnswersArray] = useState([]);

  useEffect(() => {
    async function init() {
      try {
        const playerId = localStorage.getItem("playerId");
        const gameView = await getGameView();
        
        setPowerUpInUse(gameView.powerUps[playerId]);
        setCurrentQuestionLocation(gameView.currentQuestion.location);

        //not really used at the moment---------------
        const answerKeys = Object.keys(gameView.answers);
        const playerAnswersArray = answerKeys.map((playerId, index) => {
          return {
            playerId: playerId,
            answer: gameView.answers[playerId],
            colourNumber: index + 1,
          };
        });
        setPlayerAnswersArray(playerAnswersArray);
        console.log(playerAnswersArray);
        //--------------------------------------------

      } catch (error) {
        console.error("Error fetching game view:", error);
      }
    }

    init();
  }, []); // Empty dependency array to run effect only once on mount


  if (playerAnswersArray) {
    return (
      <div className="game_view_container">
        <MapRevealLeaderboard /> {/* Fetches the data inside again, could be passed as props */}
        <PowerUpOverlay powerUpInUse={powerUpInUse} />

        {/* <div className="map question_container">
                    <div className="map text1">Round {localStorage.getItem("currentRound")}</div>
                    <div className="map text2">Find mountain: {localStorage.getItem("currentLocationName")}</div>
                    <div className="map text3">Select a location by clicking on the map.</div>
                </div> */}

        <div className="map container">
          <MapBoxComponent
            currentQuestionLocation={currentQuestionLocation}
            reveal={1}
            guessesMapReveal={playerAnswersArray}
          />
        </div>
        <ProgressBar durationInSeconds={localStorage.getItem("mapRevealTime")} onFinish={() => { }}  />
      </div>
    );
  }
};

MapReveal.propTypes = {
  setRoundState: PropTypes.func.isRequired,
};

export default MapReveal;

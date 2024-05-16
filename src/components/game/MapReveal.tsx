import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import ProgressBar from "components/ui/ProgressBar";
import MapBoxComponent from "../ui/MapBoxComponent";
import "styles/views/Question.scss";
import "styles/ui/Progressbar.scss";
import { PowerUpOverlay } from "components/ui/PowerUp";
import { MapRevealLeaderboard } from "components/ui/MapRevealLeaderboard";
import "styles/views/GameViewContainer.scss";
import { getGameView } from "./GameApi";
import { Storage } from "helpers/LocalStorageManagement";

const MapReveal = ({ setAnswers }) => {
  const [powerUpInUse, setPowerUpInUse] = useState(null);
  const [currentQuestionLocation, setCurrentQuestionLocation] = useState(null);
  const [playerAnswersArray, setPlayerAnswersArray] = useState([]);
  const [dataJsonString, setDataJsonString] = useState(null);

  useEffect(() => {
    async function init() {
      try {
        const {gameId, playerId} = Storage.retrieveGameIdAndPlayerId();
        const data = await getGameView();
        
        setDataJsonString(JSON.stringify(data));
        setPowerUpInUse(data.powerUps[playerId]);
        setCurrentQuestionLocation(data.currentQuestion.location);

        console.log(data.answers);

        const answerKeys = Object.keys(data.answers);
        const playerAnswersArray = answerKeys.map((playerId, index) => {
          return {
            playerId: playerId,
            guess_x: data.answers[playerId].location.x,
            guess_y: data.answers[playerId].location.y,
            colorNumber: index + 1,
          };
        });
        setPlayerAnswersArray(playerAnswersArray);
        console.log(playerAnswersArray);
        
        //setting answers in gameView. these are passed to mapBoxComponent
        setAnswers(playerAnswersArray);

      } catch (error) {
        console.error("Error fetching game view:", error);
      }
    }

    init();
  }, []); // Empty dependency array to run effect only once on mount


  if (playerAnswersArray) {
    return (
      <div className="game_view_container">
        <MapRevealLeaderboard dataJsonString={dataJsonString} /> {/* Fetches the data inside again, could be passed as props */}
        <PowerUpOverlay powerUpInUse={powerUpInUse} />
      </div>
    );
  }
};

MapReveal.propTypes = {
  setAnswers: PropTypes.func.isRequired,
};

export default MapReveal;

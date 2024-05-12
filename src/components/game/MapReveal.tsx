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

const MapReveal = ({ setAnswers }) => {
  const [powerUpInUse, setPowerUpInUse] = useState(null);
  const [currentQuestionLocation, setCurrentQuestionLocation] = useState(null);
  const [playerAnswersArray, setPlayerAnswersArray] = useState([]);
  const [dataJsonString, setDataJsonString] = useState(null);

  useEffect(() => {
    async function init() {
      try {
        const playerId = localStorage.getItem("playerId");
        const gameId = localStorage.getItem("gameId");

        const devData = JSON.parse(localStorage.getItem("devGameView"));
        const data = (gameId !== null && playerId !== null) ?
          await getGameView() :
          devData;
        
        setDataJsonString(JSON.stringify(data));
        setPowerUpInUse(data.powerUps[playerId]);
        setCurrentQuestionLocation(data.currentQuestion.location);

        const answerKeys = Object.keys(data.answers);
        const playerAnswersArray = answerKeys.map((playerId, index) => {
          return {
            playerId: playerId,
            answer: data.answers[playerId],
            colourNumber: index + 1,
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
  setAnswers: PropTypes.func.isRequired,
};

export default MapReveal;

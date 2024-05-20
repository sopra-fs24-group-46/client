import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "styles/views/Question.scss";
import "styles/ui/Progressbar.scss";
import { PowerUpOverlay } from "components/ui/PowerUp";
import { MapRevealLeaderboard } from "components/ui/MapRevealLeaderboard";
import "styles/views/GameViewContainer.scss";
import { getGameView } from "./GameApi";
import { Storage } from "helpers/LocalStorageManagement";

const MapReveal = ({ setAnswers , numberOfRounds}) => {
  const [powerUpInUse, setPowerUpInUse] = useState(null);
  const [playerDataArray, setPlayerDataArray] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  useEffect(() => {
    async function init() {
      try {
        const {gameId, playerId} = Storage.retrieveGameIdAndPlayerId();
        const data = await getGameView();
        
        setCurrentRound(data.currentRound);
        setPowerUpInUse(data.powerUps[playerId]);

        console.log("answers: ", data.answers);

        const answerKeys = Object.keys(data.answers);
        const playerAnswersArray = answerKeys.map((playerId, index) => {
          if (!data.answers[playerId]) return null;
          return {
            playerId: playerId,
            guess_x: data.answers[playerId].location.x,
            guess_y: data.answers[playerId].location.y,
            colorNumber: index + 1,
          };
        });
        const filteredAnswers = playerAnswersArray.filter((answer) => answer !== null); // Remove null values in case no guess was made

        const keys_playerIds = Object.keys(data.answers);
        const dataArray = keys_playerIds.map((playerId, index) => {

            const displayNameObj = data.players.find(obj => obj.playerId === playerId);
            const displayName = displayNameObj ? displayNameObj.displayName : "Unknown"; // Fallback, falls kein Name gefunden wurde
            return {
                playerId: playerId,
                displayName: displayName,
                data: {
                  score: data.currentScores[playerId].score,
                  distance: data.currentScores[playerId].distance,
                  powerUp: data.powerUps[playerId],
                  colourNumber: index + 1
                }
            };
        });

        setPlayerDataArray(dataArray);
        //setting answers in gameView. these are passed to mapBoxComponent
        setAnswers(filteredAnswers);

      } catch (error) {
        console.error("Error fetching game view:", error);
      }
    }

    init();
  }, []); // Empty dependency array to run effect only once on mount


  if (playerDataArray) {
    return (
      <div className="game_view_container">
        <MapRevealLeaderboard playerDataArray={playerDataArray}  numberOfRounds={numberOfRounds} currentRound={currentRound}/> {/* Fetches the data inside again, could be passed as props */}
        <PowerUpOverlay powerUpInUse={powerUpInUse} />
      </div>
    );
  }
};

MapReveal.propTypes = {
  setAnswers: PropTypes.func.isRequired,
  numberOfRounds: PropTypes.number
};

export default MapReveal;

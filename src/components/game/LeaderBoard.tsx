import React, { useEffect, useState } from "react";
import ProgressBar from "components/ui/ProgressBar";
import PropTypes from "prop-types";
import "styles/views/GameViewContainer.scss";

//Leaderboard container gets styled in here
import "styles/views/Leaderboard.scss";

//map container gets styled in here
import "styles/views/Question.scss";
import { getGameView, getSettings } from "./GameApi";
import { FinalLeaderboard } from "components/ui/LeaderboardComp";

interface PlayerData {
  score: number;
  distance: number;
}

const LeaderBoard = ({ numberOfRounds }) => {

  const [gameInfo, setGameInfo] = useState(null);
  const [settings, setSettings] = useState(null);

  const [playerDataArray, setPlayerDataArray] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);

  useEffect(() => {
    
    async function init() {
      try {
        const data = await getGameView();

        setCurrentRound(data.currentRound);

        const keys_playerIds = Object.keys(data.answers);
        const dataArray = keys_playerIds.map((playerId, index) => {

            const displayNameObj = data.players.find(obj => obj.playerId === playerId);
            const displayName = displayNameObj ? displayNameObj.displayName : "Unknown"; // Fallback, falls kein Name gefunden wurde
            return {
                playerId: playerId,
                displayName: displayName,
                data: {
                  score: data.cumulativeScores[playerId].score,
                  distance: data.cumulativeScores[playerId].distance,
                  powerUp: data.usedPowerUps[playerId],
                  colourNumber: index + 1
                }
            };
        });

        setPlayerDataArray(dataArray);

      } catch (error) {
        console.error("Error fetching game view:", error);
      }
    }

    init();
  }, []);



  if (playerDataArray) {

    return (
      <div className="game_view_container">

        <FinalLeaderboard
          isEnded={false}
          playerDataArray={playerDataArray}
          currentRound={currentRound}
          numberOfRounds={numberOfRounds}
        />

        
        
      </div>
      
    )
  }
};

LeaderBoard.propTypes = {
  numberOfRounds: PropTypes.number
};

export default LeaderBoard;

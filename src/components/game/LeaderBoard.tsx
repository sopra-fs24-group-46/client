import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getGameView } from "./GameApi";
import { LeaderBoardComp } from "components/ui/LeaderboardComp";

import "styles/views/GameViewContainer.scss";
import "../../styles/views/Leaderboard.scss";

const LeaderBoard = ({ numberOfRounds }) => {

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
        <div className="leaderboard container">

        {/* <div className="leaderboard boxTitle-end">Current Leaderboard</div> */}
        <div>Round: {currentRound}/{numberOfRounds}</div>

        <LeaderBoardComp
          playerDataArray={playerDataArray}
          currentRound={currentRound}
          numberOfRounds={numberOfRounds}
          />

        </div>
      </div>
      
    )
  }
};

LeaderBoard.propTypes = {
  numberOfRounds: PropTypes.number
};

export default LeaderBoard;

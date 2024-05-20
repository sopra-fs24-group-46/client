import React, { useEffect, useState } from "react";
import { FinalLeaderboard } from "components/ui/LeaderboardComp";
import "styles/views/GameViewContainer.scss";

//Leaderboard container gets styled in here
import "styles/views/Leaderboard.scss";

//map container gets styled in here
import "styles/views/Question.scss";
import { getGameView } from "../game/GameApi";



const EndView = () => {

  const [gameInfo, setGameInfo] = useState(null);
  const [playerDataArray, setPlayerDataArray] = useState([]);


  useEffect(() => {
    
    async function init() {
      try {
        const data = await getGameView();

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

        setGameInfo(data);

      } catch (error) {
        console.error("Error fetching game view:", error);
      }
    }

    init();
  }, []);

    if (gameInfo && playerDataArray) {
        return (
            <div className="game_view_container">
    
                <FinalLeaderboard
                    isEnded={true}
                    playerDataArray={playerDataArray}
                    currentRound={gameInfo.currentRound}
                    numberOfRounds={null}
                />




            </div>
        );
    }
  
};


export default EndView;

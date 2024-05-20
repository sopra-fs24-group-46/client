import React, { useEffect, useState } from "react";
import { LeaderBoardComp } from "components/ui/LeaderboardComp";
import { getGameView } from "components/game/GameApi";
import { api } from "helpers/api";
import { useNavigate } from "react-router-dom";
import { Storage } from "helpers/LocalStorageManagement";

import "styles/views/GameViewContainer.scss";
import "../../styles/views/Leaderboard.scss";

const EndView = () => {

  const navigate = useNavigate();
  const [gameInfo, setGameInfo] = useState(null);
  const [playerDataArray, setPlayerDataArray] = useState([]);

  const handleReturnToProfile = () => {
    // Check if there's a token in localStorage
    const { id, token } = Storage.retrieveUser();

    Storage.removeGameIdAndPlayerId();
    if (token) {
      // Remove specified variables from localStorage

      // Redirect to /profile
      navigate("/profile");
    } else {
      // Redirect to /home
      navigate("/home");
    }
  };

  const createNewGame = async () => {
    try {
      const { id, token } = Storage.retrieveUser();
      Storage.removeGameIdAndPlayerId();

      if (!token || !id) {
        throw new Error("Token or user id not found in localStorage");
      }

      const response = await api.post("/game/create", {
        id: id,
        token: token,
      });

      // Extract gameId from the response
      const { gameId } = response.data;
      const { playerId } = response.data;

      // Save gameId to localStorage
      Storage.storeGameIdAndPlayerId(gameId, playerId);

      console.log("Game creation");

      navigate("/game/create");
    } catch (error) {
      console.error("Error creating custom game:", error);
    }
  };

  const {gameId, playerId} = Storage.retrieveGameIdAndPlayerId();
  const sortedPlayerDataArray = [...playerDataArray].sort((a, b) => b.data.score - a.data.score);

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
    
            <div className="leaderboard container">
              

          <div className="leaderboard text-container">

            {playerId === sortedPlayerDataArray[0].playerId ? (
            <div className="leaderboard boxTitle-end">
              Congratulations you have won with {sortedPlayerDataArray[0].data.score} points!
            </div>
            ) : (
              <div className="leaderboard boxTitle-end">
              {sortedPlayerDataArray[0].displayName} has won with {sortedPlayerDataArray[0].data.score} points!
            </div>
            )}

          </div>
                <LeaderBoardComp
                    playerDataArray={playerDataArray}
                    currentRound={gameInfo.currentRound}
                    numberOfRounds={null}
                    />

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button className="primary-button" onClick={handleReturnToProfile}>
            Return to Profile/Home
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button className="primary-button" onClick={createNewGame}>
            Create New Game
          </button>
                    </div>
        </div>

            </div>
        );
    }
  
};

export default EndView;

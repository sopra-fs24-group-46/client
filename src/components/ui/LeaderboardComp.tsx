import React from "react";
import PropTypes from "prop-types";
import { api } from "helpers/api";

import { useNavigate } from "react-router-dom";
import { Storage } from "helpers/LocalStorageManagement";

interface PlayerData {
  score: number;
  distance: number;
}

export const FinalLeaderboard = ({ scores, currentRound }) => {
  const navigate = useNavigate();

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

  function getHighestScorePlayer(scores) {
    let highestScore = -Infinity;
    let highestScorePlayerId = null;

    for (const playerId in scores) {
      if (scores.hasOwnProperty(playerId)) {
        const playerScore = scores[playerId].score;
        if (playerScore > highestScore) {
          highestScore = playerScore;
          highestScorePlayerId = playerId;
        }
      }
    }

    return highestScorePlayerId;
  }

  function getHighestScore(scores) {
    let highestScore = -Infinity;

    for (const playerId in scores) {
      if (scores.hasOwnProperty(playerId)) {
        const playerScore = scores[playerId].score;
        if (playerScore > highestScore) {
          highestScore = playerScore;
        }
      }
    }

    return highestScore;
  }
  
  const {gameId, playerId} = Storage.retrieveGameIdAndPlayerId();

  return (
    <div className="leaderboard container">
      <h2 className="leaderboard title">Final Leaderboard</h2>
      {playerId === getHighestScorePlayer(scores) ? (
        <h2 className="leaderboard title">
          Congratulations you have won with {getHighestScore(scores)} points!
        </h2>
      ) : (
        <h2 className="leaderboard title">
          Player {getHighestScorePlayer(scores)} has won with {getHighestScore(scores)} points!
        </h2>
      )}

      <div className="leaderboard rounds">
        <div className="leaderboard rounds counters">Rounds played: {currentRound}</div>
      </div>

      <div className="leaderboard table-container">
        <table className="leaderboard table-leaderboard">
          <thead>
            <tr>
              <th></th>
              <th>Total Km off</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(scores).map(([playerId, playerData]: [string, PlayerData]) => {
              return (
                <tr key={playerId}>
                  <td>{playerId}</td>
                  <td>{(playerData.distance / 1000).toFixed(2)}</td>
                  <td>{playerData.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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
  );
};

FinalLeaderboard.propTypes = {
  scores: PropTypes.object, // should be PropTypes.object
  currentRound: PropTypes.number,
};

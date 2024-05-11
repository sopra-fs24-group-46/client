import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

interface PlayerData {
  score: number;
  distance: number;
}

export const FinalLeaderboard = ({ scores, currentRound }) => {
  const navigate = useNavigate();

  const handleReturnToProfile = () => {
    // Check if there's a token in localStorage
    const token = localStorage.getItem("token");
  
    if (token) {
      // Remove specified variables from localStorage
      localStorage.removeItem("currentRound");
      localStorage.removeItem("mapbox.eventData");
      localStorage.removeItem("gameId");
      localStorage.removeItem("currentLocationName");
      localStorage.removeItem("hasReloaded");
      localStorage.removeItem("y");
      localStorage.removeItem("mapRevealTime");
      localStorage.removeItem("x");
      localStorage.removeItem("mapbox.eventData.uuid");
      localStorage.removeItem("questionTime");
      localStorage.removeItem("mapbox.eventData:YW1lbWJhZA==");
      localStorage.removeItem("mapbox.eventData.uuid:YW1lbWJhZA==");
      localStorage.removeItem("guessingTime");
  
      // Redirect to /profile
      navigate("/profile");
    } else {
      // Redirect to /home
      navigate("/home");
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

  return (
    <div className="leaderboard container">
      <h2 className="leaderboard title">Final Leaderboard</h2>
      {localStorage.getItem("playerId") === getHighestScorePlayer(scores) ? (
        <h2 className="leaderboard title">Congratulations you have won with {getHighestScore(scores)} points!</h2>
        ) : (
        <h2 className="leaderboard title">Player {getHighestScorePlayer(scores)} has won with {getHighestScore(scores)} points!</h2>
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
    </div>
  );
};

FinalLeaderboard.propTypes = {
  scores: PropTypes.array,
  currentRound: PropTypes.number,
};

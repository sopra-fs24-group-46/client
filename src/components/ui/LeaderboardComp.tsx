import React from "react";
import PropTypes from "prop-types";
import { api } from "helpers/api";

import { useNavigate } from "react-router-dom";
import { Storage } from "helpers/LocalStorageManagement";
import { LeaderBoardPowerUp } from "components/ui/PowerUp";


export const FinalLeaderboard = ({ isEnded, playerDataArray, currentRound, numberOfRounds }) => {
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

  
  const {gameId, playerId} = Storage.retrieveGameIdAndPlayerId();
  const sortedPlayerDataArray = [...playerDataArray].sort((a, b) => b.data.score - a.data.score);

  //Display End Leaderboard
  if (isEnded) {

    return (
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

        <div className="leaderboard table-container">
          <table className="leaderboard table-leaderboard">
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Player</th>
                <th>Total Km off</th>
                <th>Total Points</th>
                <th>Powerups used</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayerDataArray.map((playerData, index) => (
                <tr key={index}>
                  <td>{index + 1} .</td>
                  <td>{playerData.displayName}</td>
                  <td>{(playerData.data.distance / 1000).toFixed(2)} Km</td>
                  <td>{playerData.data.score}</td>
                  <td className="leaderboard td-powerUps">
                    {playerData.data.powerUp.length === 0 ? (
                    <div>None</div>
                    ) : (
                    playerData.data.powerUp.map((powerUp, idx) => (
                      <LeaderBoardPowerUp key={idx} powerUp={powerUp} />
                    ))
                    )}
                  </td>
                </tr>
              ))}
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

  } else if (!isEnded) {

    return (
      <div className="leaderboard container">

        <div className="leaderboard boxTitle-end">Current Leaderboard</div>
        <div>Round: {currentRound}/{numberOfRounds}</div>

        <div className="leaderboard table-container">
          <table className="leaderboard table-leaderboard">
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Player</th>
                <th>Total Km off</th>
                <th>Total Points</th>
                <th>Powerups used</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayerDataArray.map((playerData, index) => (
                <tr key={index}>
                  <td>{index + 1} .</td>
                  <td>{playerData.displayName}</td>
                  <td>{(playerData.data.distance / 1000).toFixed(2)} Km</td>
                  <td>{playerData.data.score}</td>
                  <td className="leaderboard td-powerUps">
                    {playerData.data.powerUp.length === 0 ? (
                    <div>None</div>
                    ) : (
                    playerData.data.powerUp.map((powerUp, idx) => (
                      <LeaderBoardPowerUp key={idx} powerUp={powerUp} />
                    ))
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    );

  }
};

FinalLeaderboard.propTypes = {
  isEnded: PropTypes.bool,
  playerDataArray: PropTypes.array,
  currentRound: PropTypes.number,
  numberOfRounds: PropTypes.number,

};

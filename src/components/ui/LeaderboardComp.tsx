import React from "react";
import PropTypes from "prop-types";
import { LeaderBoardPowerUp } from "components/ui/PowerUp";

import "../../styles/views/Leaderboard.scss";

export const LeaderBoardComp = ({  playerDataArray, currentRound, numberOfRounds }) => {
  const sortedPlayerDataArray = [...playerDataArray].sort((a, b) => b.data.score - a.data.score);


    return (
      <>

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

      </>
    );

};

LeaderBoardComp.propTypes = {
  playerDataArray: PropTypes.array,
  currentRound: PropTypes.number,
  numberOfRounds: PropTypes.number,

};

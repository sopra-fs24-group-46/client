import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

interface PlayerData {
    score: number;
    distance: number;
  }
export const FinalLeaderboard = ({scores, currentRound}) => {

    return (
<div className="leaderboard container">
<h2 className="leaderboard title">Final Leaderboard</h2>

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
{/*<div>{JSON.stringify(gameInfo)}</div>*/}
</div>
    )
}

FinalLeaderboard.propTypes = {
    scores: PropTypes.array,
    currentRound: PropTypes.number
}

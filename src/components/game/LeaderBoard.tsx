import React, { useEffect, useState } from "react";
import ProgressBar from "components/ui/ProgressBar";
import PropTypes from "prop-types";
import "styles/views/GameViewContainer.scss";

//Leaderboard container gets styled in here
import "styles/views/Leaderboard.scss";

//map container gets styled in here
import "styles/views/Question.scss";
import { getGameView, getSettings } from "./GameApi";

interface PlayerData {
  score: number;
  distance: number;
}

const LeaderBoard = () => {

  const [gameInfo, setGameInfo] = useState(null);
  const [settings, setSettings] = useState(null);



  useEffect(() => {
    
    async function init() {
      try {
        const data = await getGameView();
        const settingsData = await getSettings();


        setGameInfo(data);
        setSettings(settingsData);


      } catch (error) {
        console.error("Error fetching game view:", error);
      }
    }

    init();
  }, []);

  //Checks if Data, which gets loaded from backend in useEffect, is ready to be displayed
  if (gameInfo && settings) {
    const roundsToPlay = settings.rounds - gameInfo.currentRound;

    return (
      <div className="game_view_container">
          <div className="leaderboard container">
            <h2 className="leaderboard title">Current Leaderboard</h2>

            <div className="leaderboard rounds">
              <div className="leaderboard rounds counters">
                Rounds played: {gameInfo.currentRound}
              </div>
              <div className="leaderboard rounds counters">
                Rounds to play: {roundsToPlay}
              </div>
            </div>

            <div className="leaderboard table-container">
              <table className="leaderboard table-leaderboard">
                <thead>
                  <tr>
                    <th></th>
                    <th>Km off</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(gameInfo.currentScores).map(
                    ([playerId, playerData]: [string, PlayerData]) => {
                      return (
                        <tr key={playerId}>
                          <td>{playerId}</td>
                          <td>{(playerData.distance / 1000).toFixed(2)}</td>
                          <td>{playerData.score}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
            <div className="leaderboard round-timer">
              Next Round starts in: TODO
            </div>
          </div>

      </div>
    );
  }
};

export default LeaderBoard;

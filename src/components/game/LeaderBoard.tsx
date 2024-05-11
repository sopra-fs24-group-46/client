import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "helpers/api";
import BaseContainer from "components/ui/BaseContainer";
import MapBoxComponent from "../ui/MapBoxComponent";
import ProgressBar from "components/ui/ProgressBar";
import { getDomain } from "helpers/getDomain";
import { FinalLeaderboard } from "components/ui/LeaderboardComp";
import PropTypes from "prop-types";

//Leaderboard container gets styled in here
import "styles/views/Leaderboard.scss";

//map container gets styled in here
import "styles/views/Question.scss";

interface PlayerData {
  score: number;
  distance: number;
}

const LeaderBoard = ({ setRoundState }) => {
  const navigate = useNavigate();
  const mapboxAccessToken =
    "pk.eyJ1IjoiYW1lbWJhZCIsImEiOiJjbHU2dTF1NHYxM3drMmlueDV3ZGtvYTlvIn0.UhwX7hVWfe4fJA-cjCX70w";

  const [gameInfo, setGameInfo] = useState(null);
  let isTimerFinished = false;
  const currentQuestionLocation = localStorage.getItem(
    "currentQuestionLocation"
  );

  //Process to get data from backend
  useEffect(() => {
    async function getGameView() {
      try {
        const gameId = localStorage.getItem("gameId");

        //Possibility to get Example JSON's from backend
        //const response = await api.get(`/game/developer/getView/game1_4_Round1Started`);

        const response = await api.get(`game/${gameId}/getView`);
        const data = response.data;
        setGameInfo(data);
        console.log(typeof gameInfo.currentScores);
      } catch (error) {
        console.error("Error fetching game settings:", error);
      }
    }

    getGameView();
  }, []);

  //Gets gameView JSON-File every 0.5 seconds
  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameId = localStorage.getItem("gameId");
        const response = await fetch(`${getDomain()}/game/${gameId}/getView`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        const roundState = jsonData.roundState;

        // Switch to Guessing View as soon as BE changes
        if (roundState === "QUESTION") {
          console.log("NOW QUESTION");
          setRoundState(roundState);
          //   navigate(
          //     `/game/${localStorage.getItem("gameId")}/round/${localStorage.getItem("currentRound")}`
          //   );
        } else if (
          jsonData.gameState === "ENDED" &&
          !localStorage.getItem("hasReloaded")
        ) {
          localStorage.setItem("hasReloaded", "true");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const intervalId = setInterval(fetchData, 500);

    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleProgressBarFinish = () => {
    const currentRound = parseInt(
      localStorage.getItem("currentRound") || "0",
      10
    );

    if (!isTimerFinished) {
      console.log("Map Reveal");
      //navigate(`/game/${localStorage.getItem("gameId")}/round/${currentRound+1}`);
    }
  };

  const handleProfileRedirect = () => {
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

    // Redirect to profile page
    navigate("/profile");
  };

  //Checks if Data, which gets loaded from backend in useEffect, is ready to be displayed
  if (gameInfo) {
    return (
      <BaseContainer>
        {gameInfo.gameState === "PLAYING" ? (
          <div className="leaderboard container">
            <h2 className="leaderboard title">Current Leaderboard</h2>

            <div className="leaderboard rounds">
              <div className="leaderboard rounds counters">
                Rounds played: {gameInfo.currentRound}
              </div>
              <div className="leaderboard rounds counters">
                Rounds to play: TODO
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
        ) : (
          <FinalLeaderboard
            scores={gameInfo.cumulativeScores}
            currentRound={gameInfo.currentRound}
          />

          //   <div className="leaderboard container">
          //     <h2 className="leaderboard title">Final Leaderboard</h2>

          //     <div className="leaderboard rounds">
          //       <div className="leaderboard rounds counters">Rounds played: {gameInfo.currentRound}</div>
          //     </div>

          //     <div className="leaderboard table-container">
          //       <table className="leaderboard table-leaderboard">
          //         <thead>
          //           <tr>
          //             <th></th>
          //             <th>Total Km off</th>
          //             <th>Total Points</th>
          //           </tr>
          //         </thead>
          //         <tbody>
          //           {Object.entries(gameInfo.cumulativeScores).map(([playerId, playerData]: [string, PlayerData]) => {
          //             return (
          //               <tr key={playerId}>
          //                 <td>{playerId}</td>
          //                 <td>{(playerData.distance / 1000).toFixed(2)}</td>
          //                 <td>{playerData.score}</td>
          //               </tr>
          //             );
          //           })}
          //         </tbody>
          //       </table>
          //     </div>
          //     {/*<div>{JSON.stringify(gameInfo)}</div>*/}
          //   </div>
          //
        )}

        <button className="primary-button" onClick={handleProfileRedirect}>
          Go to Profile
        </button>

        <div className="map container">
          <MapBoxComponent
            currentQuestionLocation={currentQuestionLocation}
            reveal={0}
            guessesMapReveal={[]}
          />
        </div>
        <ProgressBar
          durationInSeconds={localStorage.getItem("mapRevealTime")}
          onFinish={handleProgressBarFinish}
        />
      </BaseContainer>
    );
  }
};

LeaderBoard.propTypes = {
  setRoundState: PropTypes.func.isRequired,
};

export default LeaderBoard;

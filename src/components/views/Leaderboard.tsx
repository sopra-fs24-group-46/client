import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "helpers/api";
import BaseContainer from "components/ui/BaseContainer";
import MapBoxComponent from "./MapBoxComponent";
import ProgressBar from "components/ui/ProgressBar";
import { getDomain } from "helpers/getDomain";

//Leaderboard container gets styled in here
import "styles/views/Leaderboard.scss";

//map container gets styled in here
import "styles/views/Question.scss";

interface PlayerData {
  score: number;
  distance: number;
}

const Leaderboard_roundEnd = () => {

  const navigate = useNavigate();
  const mapboxAccessToken = "pk.eyJ1IjoiYW1lbWJhZCIsImEiOiJjbHU2dTF1NHYxM3drMmlueDV3ZGtvYTlvIn0.UhwX7hVWfe4fJA-cjCX70w";

  const [gameInfo, setGameInfo] = useState(null);
  let isTimerFinished = false;


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
        console.log(roundState);

        //Switch to Guessing View as soon as BE changes
        if (roundState === "QUESTION") {
          console.log("NOW QUESTION");
          navigate(`/game/${localStorage.getItem("gameId")}/round/${localStorage.getItem("currentRound")}`);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const intervalId = setInterval(fetchData, 500);

    // Cleanup function to clear the interval when component unmounts or useEffect runs again
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run effect only once on mount


  const handleProgressBarFinish = () => {

    const currentRound = parseInt(localStorage.getItem("currentRound") || "0", 10);


    if (!isTimerFinished) {
      console.log("Map Reveal");
      //navigate(`/game/${localStorage.getItem("gameId")}/round/${currentRound+1}`);
    }
  };

  //Checks if Data, which gets loaded from backend in useEffect, is ready to be displayed
  if (gameInfo) {
    return (
      <BaseContainer>
        {gameInfo.gameState === "PLAYING" ? (
          <div className="leaderboard container">
            <h2 className="leaderboard title">Current Leaderboard</h2>

            <div className="leaderboard rounds">
              <div className="leaderboard rounds counters">Rounds played: {gameInfo.currentRound}</div>
              <div className="leaderboard rounds counters">Rounds to play: TODO</div>
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
                  {Object.entries(gameInfo.currentScores).map(([playerId, playerData]: [string, PlayerData]) => {
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
            <div className="leaderboard round-timer">Next Round starts in: TODO</div>

          </div>
        ) : (
          <div className="leaderboard container">
            <h2 className="leaderboard title">Final Leaderboard</h2>

            <div className="leaderboard rounds">
              <div className="leaderboard rounds counters">Rounds played: {gameInfo.currentRound}</div>
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
                  {Object.entries(gameInfo.cumulativeScores).map(([playerId, playerData]: [string, PlayerData]) => {
                    return (
                      <tr key={playerId}>
                        <td>{playerId}</td>
                        <td>{playerData.distance}</td>
                        <td>{playerData.score}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/*<div>{JSON.stringify(gameInfo)}</div>*/}
          </div>
        )}

        <div className="map container">
          <MapBoxComponent
            reveal={0}
            guessesMapReveal={[]}
          />
        </div>
        <ProgressBar durationInSeconds={localStorage.getItem("mapRevealTime")} onFinish={handleProgressBarFinish} />

      </BaseContainer>
    );
  }


};

export default Leaderboard_roundEnd;
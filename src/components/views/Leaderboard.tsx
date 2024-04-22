import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "helpers/api";
import BaseContainer from "components/ui/BaseContainer";
import MapBoxComponent from "./MapBoxComponent";

//Leaderboard container gets styled in here
import "styles/views/Leaderboard.scss";

//map container gets styled in here
import "styles/views/Question.scss";

const Leaderboard_roundEnd = () => {

  const navigate = useNavigate();
  const mapboxAccessToken = "pk.eyJ1IjoiYW1lbWJhZCIsImEiOiJjbHU2dTF1NHYxM3drMmlueDV3ZGtvYTlvIn0.UhwX7hVWfe4fJA-cjCX70w";

  const [gameInfo, setGameInfo] = useState(null);


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
        console.log(typeof gameInfo.currentScores)

      } catch (error) {
        console.error("Error fetching game settings:", error);
      }
    }

    getGameView();
  }, []);


  //Function needed by map
  const handleonSubmitAnswer = () => {
    console.log("Submitting something");

  };

  //Checks if Data, which gets loaded from backend in useEffect, is ready to be displayed
  if (gameInfo) {
    return (
      <BaseContainer>
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
                {Object.entries(gameInfo.currentScores).map(([playerId, playerData]) => {
                  console.log("PLAYER DATA: " + playerData); // Log playerData
                  return (
                    <tr key={playerId}>
                      <td>{playerId}</td>
                      {/* todo
                      <td>{playerData.distance}</td>
                      <td>{playerData.score}</td>
                      */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>


          <div className="leaderboard round-timer">Next Round starts in: TODO</div>

        </div>
        <div className="map container">
          <MapBoxComponent
            mapboxAccessToken={mapboxAccessToken}
            onSubmitAnswer={handleonSubmitAnswer}
          />
        </div>
      </BaseContainer>
    );
  }


};

export default Leaderboard_roundEnd;
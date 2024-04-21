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
            <div className="leaderboard rounds counters">Rounds played: 1</div>
            <div className="leaderboard rounds counters">Rounds to play: 6</div>
          </div>

          <div className="leaderboard table-container">
            <table className="leaderboard table-leaderboard">
              <thead>
                <tr>
                  <th></th>
                  <th>Wins</th>
                  <th>Total km off</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>User14</td>
                  <td>1</td>
                  <td>1.8</td>
                  <td>1520</td>
                </tr>
                <tr>
                  <td>UserXY</td>
                  <td>0</td>
                  <td>2.1</td>
                  <td>1110</td>
                </tr>
                <tr>
                  <td>User1234</td>
                  <td>0</td>
                  <td>10</td>
                  <td>256</td>
                </tr>
              </tbody>
            </table>
          </div>


          <div className="leaderboard round-timer">Next Round starts in: 9</div>


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
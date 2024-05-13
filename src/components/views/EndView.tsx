import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FinalLeaderboard } from "components/ui/LeaderboardComp";
import "styles/views/GameViewContainer.scss";

//Leaderboard container gets styled in here
import "styles/views/Leaderboard.scss";

//map container gets styled in here
import "styles/views/Question.scss";
import { getGameView } from "../game/GameApi";


const EndView = () => {
  const navigate = useNavigate();

  const [gameInfo, setGameInfo] = useState(null);


  useEffect(() => {
    
    async function init() {
      try {
        const data = await getGameView();

        setGameInfo(data);

      } catch (error) {
        console.error("Error fetching game view:", error);
      }
    }

    init();
  }, []);




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
    if (gameInfo) {
        return (
            <div className="game_view_container">

                <FinalLeaderboard
                    scores={gameInfo.cumulativeScores}
                    currentRound={gameInfo.currentRound}
                />


                <button className="primary-button" onClick={handleProfileRedirect}>
                    Go to Profile
                </button>

            </div>
        );
    }
  
};


export default EndView;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FinalLeaderboard } from "components/ui/LeaderboardComp";
import "styles/views/GameViewContainer.scss";

//Leaderboard container gets styled in here
import "styles/views/Leaderboard.scss";

//map container gets styled in here
import "styles/views/Question.scss";
import { getGameView } from "../game/GameApi";
import { Storage } from "helpers/LocalStorageManagement";


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
    Storage.removeGameIdAndPlayerId();

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




            </div>
        );
    }
  
};


export default EndView;

import React, { useEffect, useState } from "react";
import { FinalLeaderboard } from "components/ui/LeaderboardComp";
import "styles/views/GameViewContainer.scss";

//Leaderboard container gets styled in here
import "styles/views/Leaderboard.scss";

//map container gets styled in here
import "styles/views/Question.scss";
import { getGameView } from "../game/GameApi";


const EndView = () => {

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

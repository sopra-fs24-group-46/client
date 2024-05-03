import React, { useEffect, useState } from "react";
import {MultiSelection} from "components/ui/MultiSelection";
import {FormField} from "components/ui/FormField";
import BaseContainer from "components/ui/BaseContainer";
import {LeaderBoardPowerUp, LeaderBoardPowerUpCollection} from "components/ui/PowerUp";
import {FinalLeaderboard} from "components/ui/LeaderboardComp";
import { api } from "helpers/api";

const ComponentDev =  () => {
    // const [gameInfo, setGameInfo] = useState(null);
    // useEffect(() => {

    //   async function getGameView() {
    //     try {
    //       const gameId = localStorage.getItem("gameId");
  
    //       //Possibility to get Example JSON's from backend
    //       //const response = await api.get(`/game/developer/getView/game1_4_Round1Started`);
  
    //       const response = await api.get(`game/${gameId}/getView`);
    //       const data = response.data;
    //       setGameInfo(data);
    //       console.log(typeof gameInfo.currentScores);
  
    //     } catch (error) {
    //       console.error("Error fetching game settings:", error);
    //     }
    //   }
  
    //   getGameView();
    // }, []);

  return (
  <BaseContainer>
      <div className="login container">
          <MultiSelection options = {["option 1", "option 2", "option 3", "option 4"]} onChange = {() => {}} label="test"/>
          <FormField type="text" label="test" placeholder="test" value={""} onChange={() => {}} />
          <LeaderBoardPowerUp powerUp = "JOKER"/>
          <LeaderBoardPowerUpCollection powerUpList = {["JOKER", "SHIELD"]}/>
          <FinalLeaderboard scores={[{score: 69, distance: 0}, {score: 0, distance: 0}]} currentRound={1}/>
      </div>
  </BaseContainer>
    );
};

export default ComponentDev;

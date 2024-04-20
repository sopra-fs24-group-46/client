import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, handleError, getAuthToken } from "helpers/api";
import BaseContainer from "components/ui/BaseContainer";
import ProgressBar from "components/ui/ProgressBar";
import { Spinner } from "components/ui/Spinner";
import "styles/views/Round.scss";
import "styles/ui/Progressbar.scss";


const RoundStart = () => {
  

  //define Variables
  const navigate = useNavigate();
  let isTimerFinished = false;

  const [gameSettings, setGameSettings] = useState(null);
  const [gameInfo, setGameInfo] = useState(null);


  //get game settings
  useEffect(() => {

    async function fetchGameSettings() {
      try {
        const response = await api.get(`/game/${localStorage.getItem("gameId")}/settings`);
        const data = response.data;
        setGameSettings(data);

        //Save settings variables in localhost
        localStorage.setItem("questionTime", data.questionTime);
        localStorage.setItem("guessingTime", data.guessingTime);
        localStorage.setItem("mapRevealTime", data.mapRevealTime);




      } catch (error) {
        console.error("Error fetching game settings:", error);
      }
    };

    fetchGameSettings();
  }, []);

  //get game view  
  useEffect(() => {

    async function getGameView() {
      try {
        const gameId = localStorage.getItem("gameId");            
        //const response = await api.get(`/game/developer/getView/game1_4_Round1Started`);
        const response = await api.get(`game/${gameId}/getView`);
        const data = response.data;
        setGameInfo(data);

        //Save current round variables in localhost
        localStorage.setItem("currentRound", data.currentRound);
        localStorage.setItem("currentLocationName", data.currentQuestion.location_name);


      } catch (error) {
        console.error("Error fetching game settings:", error);
      }
    };

    getGameView();
  }, []);

  //Function which will run when the timer finishes
  const handleProgressBarFinish = () => {

    //Makes sure function only runs once -> counters useEffect stuff i dont understand :(
    if (!isTimerFinished) {

      console.log("Timer is finished");
      
      navigate(`/game/${localStorage.getItem("gameId")}/round/${localStorage.getItem("currentRound")}/guessing`);

      isTimerFinished = true;
    }
  };


  let content = <Spinner />;
  if (gameSettings && gameInfo) {
    content = (
      <div>
        <h1 className="header title1">Round {localStorage.getItem("currentRound")}</h1>
        <div className="round container">
          <div className="round text_container">
            <div>Try to find this Mountain:</div>
            <div>{localStorage.getItem("currentLocationName")}</div>
          </div>
          <div className="round powerups_container">Powerups will be added here</div>
          <ProgressBar durationInSeconds={localStorage.getItem("questionTime")} onFinish={handleProgressBarFinish} />
        </div>
      </div>

    );
  }

  
    
  return (

    <BaseContainer>{content}</BaseContainer>

  );
};



export default RoundStart;
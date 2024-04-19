import React, { useState, useEffect } from "react";
import { api, handleError, getAuthToken } from "helpers/api";
import BaseContainer from "components/ui/BaseContainer";
import ProgressBar from "components/ui/ProgressBar";
import "styles/views/Round.scss";
import "styles/ui/Progressbar.scss";


const RoundStart = () => {


    const [questionTime, setquestionTime] = useState(null);
    const [currentRound, setCurrentRound] = useState(null);
    const [currentLocationName, setcurrentLocationName] = useState<string>('');


    //get game settings
    useEffect(() => {
        async function fetchGameSettings() {
          try {
            const gameId = localStorage.getItem("gameId");
            const response = await api.get(`/game/${gameId}/settings`);
            const data = response.data;

            //TODO DH Switch to question Time after Bug changes
            const questionTime = data.guessingTime;
            setquestionTime(questionTime);
          } catch (error) {
            console.error("Error fetching game settings:", error);
          }
        }
    
        fetchGameSettings();
      }, []);

    //get game view  
    useEffect(() => {
        async function getGameView() {
          try {
            const gameId = localStorage.getItem("gameId");
            const response = await api.get(`/game/developer/getView/game1_4_Round1Started`);
            const data = response.data;

            setCurrentRound(data.currentRound);
            setcurrentLocationName(data.currentQuestion.location_name);

          } catch (error) {
            console.error("Error fetching game settings:", error);
          }
        }
    
        getGameView();
      }, []);


    //Function which will run when the timer finishes
    const handleProgressBarFinish = () => {
        console.log("Timer is finished");

        //Switch to the Map
   
      };

    //TODO DH add proper Styling for Fonts usw  
    
    return (
        <BaseContainer>
            <h1 className="header title1">Round {currentRound}</h1>
            <div className="round container">
                <div className="round text_container">


                    <div>Try to find this Mountain:</div>
                    <div>{currentLocationName}</div>
                </div>
                <div className="round powerups_container">Powerups will be added here</div>
                <ProgressBar durationInSeconds={questionTime} onFinish={handleProgressBarFinish} />

            
            </div>
        
        
        </BaseContainer>

    );
};



export default RoundStart;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, handleError, getAuthToken } from "helpers/api";
import BaseContainer from "components/ui/BaseContainer";
import ProgressBar from "components/ui/ProgressBar";
import "styles/views/Round.scss";
import "styles/ui/Progressbar.scss";


const RoundStart = () => {

    const navigate = useNavigate();


    const [questionTime, setQuestionTime] = useState(null);
    const [currentRound, setCurrentRound] = useState(null);
    const [currentLocationName, setcurrentLocationName] = useState<string>('');

    let isTimerFinished = false;


    //get game settings
    useEffect(() => {
        async function fetchGameSettings() {
          try {
            const gameId = localStorage.getItem("gameId");
            const response = await api.get(`/game/${gameId}/settings`);
            const data = response.data;

            //timer does not work when using setQuestionTime directly
            const questionTime = data.questionTime;

            //Save settings variables in localhost
            localStorage.setItem("questionTime", data.questionTime);
            localStorage.setItem("guessingTime", data.guessingTime);
            localStorage.setItem("mapRevealTime", data.mapRevealTime);

            //Set local variables
            setQuestionTime(questionTime);

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
            //const response = await api.get(`/game/developer/getView/game1_4_Round1Started`);
            const response = await api.get(`game/${gameId}/getView`);
            const data = response.data;

            //Save current round variables in localhost
            localStorage.setItem("currentRound", data.currentRound);
            localStorage.setItem("currentLocationName", data.currentQuestion.location_name);

            //Set locat variables
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

      //Makes sure function only runs once -> counters useEffect stuff i dont understand :(
      if (!isTimerFinished) {

        const gameId = localStorage.getItem("gameId");
        console.log("Timer is finished");
        
        navigate(`/game/${gameId}/round/${currentRound}/guessing`);

        isTimerFinished = true;
      }
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
                <ProgressBar durationInSeconds={10} onFinish={handleProgressBarFinish} />

            
            </div>
        
        
        </BaseContainer>

    );
};



export default RoundStart;
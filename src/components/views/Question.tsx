import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api, handleError, getAuthToken } from "helpers/api";
import BaseContainer from "components/ui/BaseContainer";
import ProgressBar from "components/ui/ProgressBar";
import MapBoxComponent from './MapBoxComponent';
import { getDomain } from "helpers/getDomain";
import {PowerUpOverlay} from "components/ui/PowerUp";

import "styles/views/Question.scss";
import "styles/ui/Progressbar.scss";

const Question_guessing = () => {

    //Define variables
    const navigate = useNavigate();
    const guessingTimer = parseInt(localStorage.getItem("guessingTime") || "0", 10);

    //Define Hooks
    const [powerUpInUse, setPowerUpInUse] = useState(null);


    //Flag so only one guess can be submitted
    let isTimerFinished = false;

    //Submits the current guess of the player
    const submitGuess = async () => {

        //Define current variables
        const playerId = localStorage.getItem("playerId");
        const gameId = localStorage.getItem("gameId");
        const x = parseFloat(localStorage.getItem("x") || "0");
        const y = parseFloat(localStorage.getItem("y") || "0");

        console.log("Guess submitted");

        //Create requestBody
        const requestBody = {
            playerId: playerId,
            x: x,
            y: y
        };
    
        //Sends POST request to the backend
        try {
          const response = await api.post(`${getDomain()}game/${gameId}/guess`, requestBody);
          console.log(response)
    
          //TODO Propper Error Handling
        } catch (error) {
          console.log(`Error Details: ${handleError(error)}`);
        }   
    }

    //Function runs as soon as the timer is finished
    const handleProgressBarFinish = () => {

        if (!isTimerFinished) {

            submitGuess();
            isTimerFinished = true;
        }
    };

    

    //Gets gameView JSON-File every 0.5 seconds to be synchronized with the backend
    useEffect(() => {

        const fetchData = async () => {
        try {

            const gameId = localStorage.getItem("gameId");

            const response = await fetch(`${getDomain()}game/${gameId}/getView`);
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            const roundState = jsonData.roundState;

            const playerId = localStorage.getItem("playerId");
            setPowerUpInUse(jsonData.powerUps[playerId]);

            console.log(roundState);

            //Switch to Guessing View as soon as BE changes
            if (roundState === "MAP_REVEAL") {
            console.log("NOW MAP_REVEAL");
            navigate(`/game/${localStorage.getItem("gameId")}/round/${localStorage.getItem("currentRound")}/mapReveal`);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        const intervalId = setInterval(fetchData, 500);

        // Cleanup function to clear the interval when component unmounts or useEffect runs again
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to run effect only once on mount

    

    return (
        <BaseContainer>
            <PowerUpOverlay powerUp ={powerUpInUse} />
            <div className="map question_container">
                <div className="map text1">Round {localStorage.getItem("currentRound")}</div>
                <div className="map text2">Find mountain: {localStorage.getItem("currentLocationName")}</div>
                <div className="map text3">Select a location by clicking on the map.</div>
            </div>
            <div className="map container">
                <MapBoxComponent
                    reveal={0}
                    guessesMapReveal={[]}
                />
            </div>
            <ProgressBar durationInSeconds={guessingTimer-1} onFinish={handleProgressBarFinish} />
        </BaseContainer>
    );
};

export default Question_guessing;
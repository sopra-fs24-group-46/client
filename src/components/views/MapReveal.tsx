import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types'; // Import PropTypes
import { useNavigate } from "react-router-dom";
import { api } from "helpers/api";
import BaseContainer from "components/ui/BaseContainer";
import ProgressBar from "components/ui/ProgressBar";
import MapBoxComponent from './MapBoxComponent';
import "styles/views/Question.scss";
import "styles/ui/Progressbar.scss";
import { getDomain } from "helpers/getDomain";
import { PowerUpOverlay} from "components/ui/PowerUp";


const Question_guessing = () => {
    const navigate = useNavigate();
    const mapboxAccessToken = 'pk.eyJ1IjoiYW1lbWJhZCIsImEiOiJjbHU2dTF1NHYxM3drMmlueDV3ZGtvYTlvIn0.UhwX7hVWfe4fJA-cjCX70w';
    let isTimerFinished = false;
    const currentRound = localStorage.getItem("currentRound");
    const [powerUpInUse, setPowerUpInUse] = useState(null);
    const [currentQuestionLocation, setCurrentQuestionLocation] = useState(null);
    const [playerAnswersArray, setPlayerAnswersArray] = useState([]);


    useEffect(() => {

        async function fetchGameView() {
            try {
                
      
                const gameId = localStorage.getItem("gameId");
                //const response = await api.get(`/game/developer/getView/game1_6_Round1Ended`);
                const response = await api.get(`/game/${gameId}/getView`);
                const gameView = response.data;

                const answerKeys = Object.keys(gameView.answers);

                
                const playerAnswersArray = answerKeys.map(playerId => {
                    return {
                        playerId: playerId,
                        answer: gameView.answers[playerId]
                    };
                });

                setPlayerAnswersArray(playerAnswersArray);
                setCurrentQuestionLocation(gameView.currentQuestion.location);

                console.log(playerAnswersArray);

            } catch (error) {
              console.error("Error fetching game settings:", error);
            }
          }
      
          fetchGameView();



    }, []);

    //Gets gameView JSON-File every 0.5 seconds
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
            if (roundState === "LEADERBOARD") {
            console.log("NOW LEADERBOARD");
            navigate(`/game/${localStorage.getItem("gameId")}/round/${localStorage.getItem("currentRound")}/leaderboard`);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        const intervalId = setInterval(fetchData, 500);

        // Cleanup function to clear the interval when component unmounts or useEffect runs again
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to run effect only once on mount

    const handleProgressBarFinish = () => {
        if (!isTimerFinished) {
            console.log("Map Reveal");
            //navigate(`/game/${localStorage.getItem("gameId")}/round/${currentRound}/leaderboard`);
        }
    };


    if (playerAnswersArray) {
        return (
            <BaseContainer>
                <PowerUpOverlay powerUpInUse={powerUpInUse} />
                <div className="map question_container">
                    <div className="map text1">Round {localStorage.getItem("currentRound")}</div>
                    <div className="map text2">Find mountain: {localStorage.getItem("currentLocationName")}</div>
                    <div className="map text3">Select a location by clicking on the map.</div>
                </div>
                <div className="map container">
                    <MapBoxComponent
                        currentQuestionLocation={currentQuestionLocation}
                        reveal={1}
                        guessesMapReveal={playerAnswersArray}
                    />
                </div>
                <ProgressBar durationInSeconds={localStorage.getItem("mapRevealTime")} onFinish={handleProgressBarFinish}  />
            </BaseContainer>
        );
    }
};


export default Question_guessing;

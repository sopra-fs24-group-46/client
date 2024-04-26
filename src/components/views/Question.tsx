import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api, handleError, getAuthToken } from "helpers/api";
import BaseContainer from "components/ui/BaseContainer";
import ProgressBar from "components/ui/ProgressBar";
import MapBoxComponent from './MapBoxComponent';
import { getDomain } from "helpers/getDomain";

import "styles/views/Question.scss";
import "styles/ui/Progressbar.scss";

const Question_guessing = () => {

    const navigate = useNavigate();
    const mapboxAccessToken = 'pk.eyJ1IjoiYW1lbWJhZCIsImEiOiJjbHU2dTF1NHYxM3drMmlueDV3ZGtvYTlvIn0.UhwX7hVWfe4fJA-cjCX70w';
    const [selectedCoordinates, setSelectedCoordinates] = useState<{ x: number, y: number } | ''>('');
    const [gameState, setGameState] = useState('');
    const [roundState, setRoundState] = useState('');
    const [currentRound, setCurrentRound] = useState('');
    const gameId = localStorage.getItem("gameId");

    let isTimerFinished = false;

    const fetchGameView = useCallback(() => {
        fetch(`${getDomain()}game/${gameId}/getView`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response shows no connection to server');
                }
                return response.json();
            })
            .then(data => {
                setGameState(data.gameState);
                setRoundState( data.roundState);
                setCurrentRound(data.currentRound);
                localStorage.setItem("currentRound", data.currentRound);
                localStorage.setItem("currentLocationName", data.currentQuestion.location_name);
            })
            .catch(error => {
                console.error('Error fetching game/round state in question guessing:', error);
            });
    }, [gameId]);

    useEffect(() => {
        const interval = setInterval(fetchGameView, 15000); // Check game state every 20 seconds
        return () => clearInterval(interval);
    }, [fetchGameView]);

    const handleProgressBarFinish = () => {
        if (!isTimerFinished) {

            const playerId = localStorage.getItem("playerId");
            const gameId = localStorage.getItem("gameId");
            const x = parseFloat(localStorage.getItem("x") || "0");
            const y = parseFloat(localStorage.getItem("y") || "0");

            // Submit coordinates to the backend
            fetch(`${getDomain()}game/${gameId}/guess`, {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    playerId,
                    x: x,
                    y: y,
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw `Server error: [${response.status}] [${response.statusText}] [${response.url}]`;
                    }
                    return response.json();
                })
                .then(receivedJson => {
                    // Handle the received JSON data
                    console.log(receivedJson);
                })
                .catch(err => {
                    console.debug("Error in fetch", err);
                });


            console.log("Timer is finished");
            //navigate(`/game/${localStorage.getItem("gameId")}/round/${localStorage.getItem("currentRound")}/mapReveal`);
            isTimerFinished = true;
        }
    };

    const handle_finish = async () => {

        //Define current variables
        const playerId = localStorage.getItem("playerId");
        const gameId = localStorage.getItem("gameId");
        const x = parseFloat(localStorage.getItem("x") || "0");
        const y = parseFloat(localStorage.getItem("y") || "0");

        //Create requestBody
        const requestBody = {
            playerId: playerId,
            x: x,
            y: y
        };
    
        try {
          const response = await api.post(`${getDomain()}game/${gameId}/guess`, requestBody);
          console.log(response)
    
          //TODO Propper Error Handling
        } catch (error) {
          console.log(`Error Details: ${handleError(error)}`);
        }   
      }

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

    const hanleMapClick = (coordinates) => {
        console.log(coordinates.x, coordinates.y);

    };


    const handleAnswerSubmit = (coordinates: { x: number, y: number }) => {
    const playerId = localStorage.getItem("playerId");
    const gameId = localStorage.getItem("gameId");
        setSelectedCoordinates(coordinates);

        // Submit coordinates to the backend
        fetch(`${getDomain()}game/${gameId}/guess`, {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerId,
                x: coordinates.x,
                y: coordinates.y,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw `Server error: [${response.status}] [${response.statusText}] [${response.url}]`;
                }
                return response.json();
            })
            .then(receivedJson => {
                // Handle the received JSON data
                console.log(receivedJson);
            })
            .catch(err => {
                console.debug("Error in fetch", err);
            });
    };

    const guessingTimer = parseInt(localStorage.getItem("guessingTime") || "0", 10);

    return (
        <BaseContainer>
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
            <ProgressBar durationInSeconds={guessingTimer-2} onFinish={handle_finish} />
        </BaseContainer>
    );
};

export default Question_guessing;
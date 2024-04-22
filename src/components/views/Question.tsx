import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api, handleError, getAuthToken } from "helpers/api";
import BaseContainer from "components/ui/BaseContainer";
import ProgressBar from "components/ui/ProgressBar";
import MapBoxComponent from './MapBoxComponent';

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
        fetch(`http://localhost:8080/game/${gameId}/getView`)
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
            console.log("Timer is finished");
            navigate(`/game/${localStorage.getItem("gameId")}/round/${localStorage.getItem("currentRound")}/mapReveal`);
            isTimerFinished = true;
        }
    };


    const handleAnswerSubmit = (coordinates: { x: number, y: number }) => {
    const playerId = localStorage.getItem("playerId");
    const gameId = localStorage.getItem("gameId");
        setSelectedCoordinates(coordinates);

        // Submit coordinates to the backend
        fetch(`http://localhost:8080/game/${gameId}/guess`, {

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

    return (
        <BaseContainer>
            <div className="map question_container">
                <div className="map text1">Round {localStorage.getItem("currentRound")}</div>
                <div className="map text2">Find mountain: {localStorage.getItem("currentLocationName")}</div>
                <div className="map text3">Select a location by clicking on the map.</div>
            </div>
            <div className="map container">
                <MapBoxComponent
                    mapboxAccessToken={mapboxAccessToken}
                    onSubmitAnswer={handleAnswerSubmit}
                />
            </div>
            <ProgressBar durationInSeconds={localStorage.getItem("guessingTime")} onFinish={handleProgressBarFinish} />
        </BaseContainer>
    );
};

export default Question_guessing;
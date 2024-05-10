import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import ProgressBar from "components/ui/ProgressBar";
import MapBoxComponent from 'components/ui/MapBoxComponent';
import { PowerUpOverlay } from "components/ui/PowerUp";
import { getDomain } from "helpers/getDomain";
import { fetchGameView, handleAnswerSubmit, fetchGameData } from "./hooks";

import "styles/views/Question.scss";
import "styles/ui/Progressbar.scss";

const Question_guessing = () => {
    const navigate = useNavigate();
    const gameId = localStorage.getItem("gameId");
    const currentQuestionLocation = localStorage.getItem("currentQuestionLocation");

    const [gameState, setGameState] = useState('');
    const [roundState, setRoundState] = useState('');
    const [currentRound, setCurrentRound] = useState('');
    const [powerUpInUse, setPowerUpInUse] = useState(null);

    const guessingTimer = useMemo(() => parseInt(localStorage.getItem("guessingTime") || "0", 10), []);

    const fetchGameViewCallback = useCallback(() => fetchGameView(gameId, setGameState, setRoundState, setCurrentRound), [gameId]);

    useEffect(() => {
        const interval = setInterval(fetchGameViewCallback, 15000);
        return () => clearInterval(interval);
    }, [fetchGameViewCallback]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { roundState: newRoundState, powerUps } = await fetchGameData(gameId);
                const playerId = localStorage.getItem("playerId");
                setPowerUpInUse(powerUps[playerId]);

                if (newRoundState === "MAP_REVEAL") {
                    navigate(`/game/${gameId}/round/${localStorage.getItem("currentRound")}/mapReveal`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const intervalId = setInterval(fetchData, 500);
        return () => clearInterval(intervalId);
    }, [gameId, navigate]);

    const handleFinish = useCallback(() => handleAnswerSubmit(gameId), [gameId]);

    return (
        <BaseContainer>
            <PowerUpOverlay powerUp={powerUpInUse} />
            <div className="map question_container">
                <div className="map text1">Round {currentRound}</div>
                <div className="map text2">Find mountain: {localStorage.getItem("currentLocationName")}</div>
                <div className="map text3">Select a location by clicking on the map.</div>
            </div>
            <div className="map container">
                <MapBoxComponent
                    currentQuestionLocation={currentQuestionLocation}
                    reveal={0}
                    guessesMapReveal={[]}
                />
            </div>
            <ProgressBar durationInSeconds={guessingTimer - 2} onFinish={handleFinish} />
        </BaseContainer>
    );
};

export default Question_guessing;
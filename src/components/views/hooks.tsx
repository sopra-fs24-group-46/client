import { getDomain } from "helpers/getDomain";
import { api, handleError } from "helpers/api";

export const fetchGameView = (gameId, setGameState, setRoundState, setCurrentRound) => {
    fetch(`${getDomain()}game/${gameId}/getView`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response shows no connection to server');
            }
            return response.json();
        })
        .then(data => {
            setGameState(data.gameState);
            setRoundState(data.roundState);
            setCurrentRound(data.currentRound);
            localStorage.setItem("currentRound", data.currentRound);
            localStorage.setItem("currentLocationName", data.currentQuestion.location_name);
        })
        .catch(error => {
            console.error('Error fetching game/round state in question guessing:', error);
        });
};

export const handleAnswerSubmit = async (gameId) => {
    const playerId = localStorage.getItem("playerId");
    const x = parseFloat(localStorage.getItem("x") || "0");
    const y = parseFloat(localStorage.getItem("y") || "0");

    const requestBody = {
        playerId,
        x,
        y
    };

    try {
        const response = await api.post(`${getDomain()}game/${gameId}/guess`, requestBody);
        console.log(response);
    } catch (error) {
        console.log(`Error Details: ${handleError(error)}`);
    }
};

export const fetchGameData = async (gameId) => {
    const response = await fetch(`${getDomain()}game/${gameId}/getView`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    return jsonData;
};
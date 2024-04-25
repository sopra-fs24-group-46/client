import { useEffect, useCallback, useState } from 'react';

const usePeriodicGameViewFetch = (gameId, intervalTime = 2000) => {
    const [gameState, setGameState] = useState(null);
    const [roundState, setRoundState] = useState(null);
    const [currentRound, setCurrentRound] = useState(null);
    const [currentLocationName, setCurrentLocationName] = useState(null);

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
                setRoundState(data.roundState);
                setCurrentRound(data.currentRound);
                localStorage.setItem("currentRound", data.currentRound);
                localStorage.setItem("gameId", gameId);
                localStorage.setItem("currentLocationName", data.currentQuestion.location_name);
            })
            .catch(error => {
                console.error('Error fetching game/round state in question guessing:', error);
            });
    }, [gameId]);

    useEffect(() => {
        const interval = setInterval(fetchGameView, intervalTime);
        return () => clearInterval(interval);
    }, [fetchGameView, intervalTime]);

    return { gameId, gameState, roundState, currentRound, currentLocationName};
};

export default usePeriodicGameViewFetch;
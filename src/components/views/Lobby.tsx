import React, { useState, useEffect } from "react";
import { api, handleError, getAuthToken } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import BaseContainer from "components/ui/BaseContainer";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "styles/views/Lobby.scss";
import { Score } from "../../helpers/types";

const Lobby = () => {
  const navigate = useNavigate();
  const [gameSettings, setGameSettings] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [round, setRound] = useState(null);

  const userId = localStorage.getItem('id');

  const [currentQuestionLocation, setCurrentQuestionLocation] = useState<{ x: number, y: number } | null>(null);
  const [currentQuestionName, setCurrentQuestionName] = useState<string>(null);
  const [roundState, setRoundState] = useState<string>('');
  const [gameState, setGameState] = useState<string>('');
  const [playerId, setPlayerId] = useState<string>('');
  const [playerScores, setPlayerScores] = useState<Record<string, Score>>({});
  const [cumulativeScores, setCumulativeScores] = useState<Record<string, Score>>({});

  useEffect(() => {
    async function fetchGameSettings() {
      try {
        const gameId = localStorage.getItem("gameId");
        const response = await api.get(`/game/${gameId}/settings`);
        const settings = response.data;
        setGameSettings(settings);
        setGameId(gameId);
      } catch (error) {
        console.error("Error fetching game settings:", error);
      }
    }

    fetchGameSettings();
  }, []);

  const startGame = async () => {
    // Check if the required conditions are met to start the game
    if (gameSettings && gameSettings.maxPlayers && gameSettings.rounds) {
      // Ensure the number of players meets the requirement
      if (gameSettings.maxPlayers >= playerId.length) {
        const gameId = localStorage.getItem("gameId");
        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        //const playerId = localStorage.getItem("playerId");

        const requestBody = {
          id: userId,
          token: token,

        };

        try {
          // Open the lobby first before starting the game
          //await api.post(`/game/${gameId}/openLobby`, requestBody);

          // Once the lobby is open, start the game
          const response = await api.post(`/game/${gameId}/start`, requestBody);
          setHasGameStarted(true);
          console.log("game started", response.data);

          navigate(`/game/${gameId}/round/1`);
        } catch (error) {
          console.log(`Error Details: ${handleError(error)}`);
        }
      } else {
        console.log('Number of players does not meet the requirement to start the game.');
      }
    } else {
      console.log('Game settings not available.');
    }
  };

  useEffect(() => {
    fetchGameView();
  }, []);

  const handleLeaveLobby = () => {
    // Redirect the player to the home page
    navigate('/profile');
  };

  const fetchGameView = () => {
    const gameId = localStorage.getItem("gameId");

    // Fetch game state from backend using gameId
    fetch(`http://localhost:8080/game/${gameId}/getView`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response shows no connection to server');
        }
        return response.json();
      })
      .then(data => {
        if (data.gameState === "ENDED") {
          // Handle game end condition
          console.log('Game has ended');
          navigate("/leaderboard");
        }
      })
      .catch(error => {
        console.error('Error fetching game/round state in lobby:', error);
      });
  };


  let content = <Spinner />;

  if (gameSettings) {
    content = (
      <div className="lobby-container">
        <h1 className="lobby-title">Game Lobby</h1>
        <div className="lobby-info">
          <p>Game ID: {gameId}</p>
          <p>Max Players: {gameSettings.maxPlayers}</p>
          <p>Rounds: {gameSettings.rounds}</p>
          <p>Guessing Time per Round: {gameSettings.guessingTime}</p>
        </div>
        <button onClick={startGame}>Start Game</button> {/* Button to start the game */}
        <button onClick={handleLeaveLobby}>Leave Lobby</button> {/* Button to leave the lobby */}
        {/* You can add more components or buttons related to the lobby here */}
      </div>
    );
  }

  return <BaseContainer>{content}</BaseContainer>;
};

export default Lobby;

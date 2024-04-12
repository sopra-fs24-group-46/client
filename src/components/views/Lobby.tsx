import React, { useState, useEffect } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Lobby.scss";

const Lobby = () => {
  const [gameSettings, setGameSettings] = useState(null);
  const [gameId, setGameId] = useState(null);

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
        {/* You can add more components or buttons related to the lobby here */}
      </div>
    );
  }

  return <BaseContainer>{content}</BaseContainer>;
};

export default Lobby;


import React, { useState, useEffect } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import BaseContainer from "components/ui/BaseContainer";
import { useNavigate } from "react-router-dom";
import { getDomain } from "helpers/getDomain";
//import PropTypes from "prop-types";
import "styles/views/Lobby.scss";
//import { Score } from "../../helpers/types";

const Lobby = () => {
  const navigate = useNavigate();
  const [gameSettings, setGameSettings] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [maxPlayers, setMaxPlayers] = useState(null);
  const userId = localStorage.getItem('id');
  const currentRound = localStorage.getItem('currentRound');
  const [playerId, setPlayerId] = useState<string>('');
  const [players, setPlayers] = useState([]);

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
        const gameState = jsonData.gameState;
        console.log(gameState);

        const gamePlayers = jsonData.players || [];
        setPlayers(gamePlayers);

        if (gameState === "PLAYING") {
          console.log("NOW PLAYING");
          navigate(`/game/${gameId}/round/1`);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 500);

    // Cleanup function to clear the interval when component unmounts or useEffect runs again
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run effect only once on mount



  //Gets game settings when site loads
  useEffect(() => {
    async function fetchGameSettings() {
      try {

        const gameId = localStorage.getItem("gameId");
        const maxPlayers = localStorage.getItem("maxPlayers");
        const response = await api.get(`/game/${gameId}/settings`);
        const settings = response.data;
        setGameSettings(settings);
        setGameId(gameId);
        (setMaxPlayers(maxPlayers));
      } catch (error) {
        console.error("Error fetching game settings:", error);
      }
    }

    fetchGameSettings();
  }, []);

  const startGame_test = async () => {

    //Define current variables
    const gameId = localStorage.getItem("gameId");
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    //Create requestBody
    const requestBody = {
      id: userId,
      token: token,
    };

    try {

      //Start game in the backend
      const response = await api.post(`/game/${gameId}/start`, requestBody);

      //TODO Propper Error Handling
    } catch (error) {
      console.log(`Error Details: ${handleError(error)}`);
    }   
  }



  const handleLeaveLobby = () => {
    // Redirect the player to the home page
    navigate('/profile');
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
          <div>
            <h1>Player List</h1>
            <table>
              <thead>
                <tr>
                  <th>Player ID</th>
                  <th>Display Name</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr key={index}>
                    <td>{player.playerId}</td>
                    <td>{player.displayName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button onClick={startGame_test}>Start Game</button> {/* Button to start the game */}
        <button onClick={handleLeaveLobby}>Leave Lobby</button> {/* Button to leave the lobby */}
        {/* You can add more components or buttons related to the lobby here */}
      </div>
    );
  }

  return <BaseContainer>{content}</BaseContainer>;
};

export default Lobby;

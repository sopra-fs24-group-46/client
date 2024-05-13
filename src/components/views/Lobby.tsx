import React, { useState, useEffect, useRef } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import BaseContainer from "components/ui/BaseContainer";
import { useNavigate } from "react-router-dom";
import { getDomain } from "helpers/getDomain";
//import PropTypes from "prop-types";
import "styles/views/Lobby.scss";
import QRCode from "qrcode.react";

//import { Score } from "../../helpers/types";

const Lobby = () => {
  const navigate = useNavigate();
  const [gameSettings, setGameSettings] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [maxPlayers, setMaxPlayers] = useState(null);
  const userId = localStorage.getItem("id");
  const currentRound = localStorage.getItem("currentRound");
  const [playerId, setPlayerId] = useState<string>("");
  const [players, setPlayers] = useState([]);
  const copyButtonRef = useRef(null);

  //Gets gameView JSON-File every 0.5 seconds
  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameId = localStorage.getItem("gameId");

        const response = await fetch(`${getDomain()}game/${gameId}/getView`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        const gameState = jsonData.gameState;
        console.log(gameState);

        const gamePlayers = jsonData.players || [];
        setPlayers(gamePlayers);

        if (gameState === "PLAYING") {
          console.log("NOW PLAYING");
          navigate("/game")
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
        setMaxPlayers(maxPlayers);
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
  };

  const handleLeaveLobby = () => {
    // Show a confirmation dialog
    const confirmed = window.confirm("Are you sure you want to leave the lobby?");

    // Check if the user confirmed
    if (confirmed) {
      // User confirmed, leaving the lobby
      const token = localStorage.getItem("token");
      if (token) {
        localStorage.removeItem("gameId");
        localStorage.removeItem("playerId");

        navigate("/profile");
      } else {
        localStorage.removeItem("gameId");
        localStorage.removeItem("playerId");

        navigate("/home");
      }
    } else {
      // User canceled, do nothing or provide feedback
      console.log("User canceled leaving the lobby.");
    }
  };

  const copyGameCode = () => {
    if (gameId) {
      navigator.clipboard.writeText(gameId);

      if (copyButtonRef.current) {
        const copyButton = copyButtonRef.current;
        copyButton.style.backgroundColor = "white";
        copyButton.style.color = "black";
        copyButton.style.border = "2px solid black";
        copyButton.innerHTML = "Copied!";
      }
    }
  };

  //Change as soon as BE is changed
  const handleLeaveLobby_test = async () => {
    //Define current variables
    const gameId = localStorage.getItem("gameId");
    const playerId = localStorage.getItem("playerId");

    //Create requestBody
    const requestBody = {
      playerId: playerId,
    };

    try {
      const response = await api.put(`/game/${gameId}/leave`, requestBody);
    } catch (error) {
      console.log(`Error Details: ${handleError(error)}`);
    }
    navigate("/profile");
  };

  let content = <Spinner />;

  if (gameSettings) {
    content = (
      <div className="lobby container">
        <div className="lobby settings-container">
          <div className="lobby gameID-title">Game ID:</div>
          <div className="lobby gameID-content">{gameId}</div>
          <button
            ref={copyButtonRef}
            onClick={copyGameCode}
            className="button"
            type="button"
          >
            Copy GameId
          </button>
          <div className="lobby gameSettings-title">Game settings:</div>
          <div className="lobby gameSettings-content">
            Max Players: {gameSettings.maxPlayers}
          </div>
          <div className="lobby gameSettings-content">
            Rounds: {gameSettings.rounds}
          </div>
          <div className="lobby gameSettings-content">
            Guessing Time per Round: {gameSettings.guessingTime}
          </div>
        </div>
        <div className="lobby players-container">
          <div className="lobby playersTable-title">
            {players.length}/{gameSettings.maxPlayers} Players in the Lobby
          </div>
          <div className="lobby playersTable-container">
            <table className="lobby playersTable">
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

          <button onClick={startGame_test} className="button">
            Start Game
          </button>
          {/* Button to start the game */}
          <button onClick={handleLeaveLobby} className="button">
            Leave Lobby
          </button>
          <div className="lobby qr-code">
            <div className="lobby qr-code title">Scan code:</div>

            <QRCode value={`${window.location.origin}/home?gameId=${gameId}`} />
            {/* Rest of the component */}
          </div>
        </div>
      </div>
    );
  }
  return (
    <BaseContainer>
      <h1 className="header title1">GAME LOBBY</h1>
      {content}
    </BaseContainer>
  );
};

export default Lobby;

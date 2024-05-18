import React, { useState, useEffect, useRef } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import BaseContainer from "components/ui/BaseContainer";
import { useNavigate } from "react-router-dom";
import { getDomain } from "helpers/getDomain";
import QRCode from "qrcode.react";
import { Storage } from "helpers/LocalStorageManagement";
import { getGameView, getSettings, leaveGame } from "components/game/GameApi";
import { useError } from "components/ui/ErrorContext";

import "styles/views/Lobby.scss";
import {Button} from "../ui/Button";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmToast } from 'react-confirm-toast';

const Lobby = () => {
  const { showError } = useError();
  const navigate = useNavigate();
  const [gameSettings, setGameSettings] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [players, setPlayers] = useState([]);
  const copyButtonRef = useRef(null);
  const [showConfirmToast, setShowConfirmToast] = useState(false);

  //Gets gameView JSON-File every 0.5 seconds
  useEffect(() => {
    const fetchData = async () => {
      try {

        const jsonData = await getGameView(showError);
        if (!jsonData || jsonData.gameState === "CLOSED") {
          doLeaveGame();
        }
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
      const {gameId, playerId} = Storage.retrieveGameIdAndPlayerId();
      try {
        const settings = await getSettings(showError);
        setGameSettings(settings);
        setGameId(gameId);
      } catch (error) {
        console.error("Error fetching game settings:", error);
      }
    }

    fetchGameSettings();
  }, []);

  const startGame = async () => {
    //Define current variables
    const {gameId, playerId} = Storage.retrieveGameIdAndPlayerId();
    const {id: userId, token} = Storage.retrieveUser();

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
    setShowConfirmToast(true);
  };


  const doLeaveGame = async () => {
    leaveGame(showError);
    const {id , token} = Storage.retrieveUser();
    Storage.removeGameIdAndPlayerId();

    if (token) {
      navigate("/profile");
    } else {
      navigate("/home");
    }
  }

  const copyGameCode = () => {
    if (gameId) {
      navigator.clipboard.writeText(gameId)
          .then(() => {
            toast.info("Game ID copied!", { position: "top-center", autoClose:500 , hideProgressBar: true, theme:"dark"});
          })
          .catch((error) => {
            console.error("Failed to copy game ID:", error);
          });
    }
  };

  let content = <Spinner />;

  if (gameSettings) {
    content = (
        <div className="lobby container">
          <div className="lobby settings-container">
            <div className="lobby gameSettings-title">Game settings:</div>
            <div className="lobby gameSettings-content">
              <ol>
                <li>
                  Max Players: &nbsp;
                  <mark> {gameSettings.maxPlayers}</mark>
                </li>
                <li>
                  Rounds: &nbsp;
                  <mark>{gameSettings.rounds}</mark>
                </li>
                <li>
                  Guessing Time per Round: &nbsp;
                  <mark>{gameSettings.guessingTime}</mark>
                </li>
              </ol>
            </div>
            <div className="lobby gameID-content">Game ID: <mark>{gameId}</mark></div>
            <Button ref={copyButtonRef} onClick={copyGameCode}>
              Copy GameId
            </Button>
          </div>

          <div className="lobby players-container">
            <div className="lobby playersTable-title">
              {players.length}/{gameSettings.maxPlayers} Players in the Lobby
            </div>
            <div className="lobby playersTable-container">
              <ol className="lobby playersList">
                {players.map((player, index) => (
                    <li key={index}>
                      {player.playerId}  <mark> {player.displayName}</mark>
                    </li>
                ))}
              </ol>
            </div>

            <Button onClick={startGame} className="button-primary">
              Start Game
            </Button>
            {/* Button to start the game */}
            <Button onClick={handleLeaveLobby} className="button-primary">
              Leave Lobby
            </Button>
            <ConfirmToast
                showConfirmToast={showConfirmToast}
                setShowConfirmToast={setShowConfirmToast}
                customFunction={doLeaveGame}
                toastText="Are you sure you want to leave the lobby?"
                buttonYesText="Leave"
                buttonNoText="Cancel"
                theme="dark"
            />
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
        <h1 className="header1 lobby">GAME LOBBY</h1>
        {content}

      </BaseContainer>
  );
};

export default Lobby;
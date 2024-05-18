import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import BaseContainer from "components/ui/BaseContainer";
import { useNavigate } from "react-router-dom";
import { getDomain } from "helpers/getDomain";
import QRCode from "qrcode.react";
import { Storage } from "helpers/LocalStorageManagement";
import { getGameView, getSettings, leaveGame } from "components/game/GameApi";
import { useError } from "components/ui/ErrorContext";

import "styles/views/GameViewContainer.scss";
import "styles/views/FancyBackground.scss";
import "styles/views/Lobby.scss";
import {Button} from "../ui/Button";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmToast } from 'react-confirm-toast';

const Lobby = ({players}) => {
  const { showError } = useError();
  const navigate = useNavigate();
  const [gameSettings, setGameSettings] = useState(null);
  const [gameId, setGameId] = useState(null);
  const copyButtonRef = useRef(null);
  const [showConfirmToast, setShowConfirmToast] = useState(false);

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
      <div className="game_view_container" >

<div style={{zIndex: 4}}>
        <h1 className="header1 lobby">GAME LOBBY</h1>
        {content}
</div>

        <div className="area" style={{zIndex: 3}}>
          <ul className="circles">
                  <li></li>
                  <li><div className="centering">{':O'}</div></li>
                  <li><div className="centering">{':)'}</div></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
          </ul>
        </div >

      </div>
  );
};

Lobby.propTypes = {
  players: PropTypes.array.isRequired,
};

export default Lobby;

export const doLeaveGame = async (navigate, showError) => {
      leaveGame(showError);
      const {id , token} = Storage.retrieveUser();
      Storage.removeGameIdAndPlayerId();
      
      if (token) {
        navigate("/profile");
      } else {
        navigate("/home");
      }
  }
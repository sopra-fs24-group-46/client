import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import Header from "components/views/Header";
import { joinGame } from "components/game/GameApi";
import { useError } from "components/ui/ErrorContext";


const Home = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [gamePin, setGamePin] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [isGamePinEditable, setIsGamePinEditable] = useState(true);


  useEffect(() => {
    const url = new URL(window.location.href);
    const gameId = url.searchParams.get('gameId');
    if (gameId) {
      setGamePin(gameId);
      setIsGamePinEditable(false);
    }
  }, []);


  const inputIsValid = () => {
    return playerName.length > 0 && gamePin.length > 0;
  }


  const handleRegisterClick = () => {
    navigate("/register");
  };


  const handleLoginClick = () => {
    navigate("/login");
  };


  return (
      <BaseContainer>
        <Header />
        <div className="login container">
          <div className="login form">
            <div className="login field">
              <input
                  className="login input"
                  type="text"
                  placeholder="Enter Player Name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
              />
            </div>
            <div className="login field">
              <input
                  className="login input"
                  type="text"
                  placeholder="Enter Game Pin"
                  value={gamePin}
                  onChange={(e) => setGamePin(e.target.value)}
                  disabled={!isGamePinEditable}
              />
            </div>
            <div className="login button-container">
            <Button
              disabled={!inputIsValid()}
              width="100%" onClick={() => joinGame(gamePin, playerName, navigate, showError)}>
                Join Game
              </Button>
            </div>
            <div
                className="login link-container"
                style={{
                  marginTop: "1em",
                  display: "flex",
                  justifyContent: "space-between",
                }}
            >
            <Button className="login switch-button primary-button" onClick={handleRegisterClick}>
              Register here
            </Button>
            <Button className="login switch-button primary-button" onClick={handleLoginClick}>
              Login
            </Button>
            </div>
          </div>
        </div>
      </BaseContainer>
  );
};


export default Home;
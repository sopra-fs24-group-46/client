import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import Header from "components/views/Header";
import { joinGame } from "components/game/GameApi";
import { useError } from "components/ui/ErrorContext";
import {FormField} from "components/ui/FormFieldString";

//styling
import "styles/views/Header.scss";
import "styles/views/Authentication.scss";


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
      <h1 className="header authentication">Gwüsst</h1>
      <div className="authentication container">
        <div className="authentication form">
          <FormField
            className="authentication"
            type="text"
            value={playerName}
            placeholder={"Enter Player Name"}
            onChange={(un: string) => setPlayerName(un)}
          />
          <FormField
            className="authentication"
            type="text"
            value={gamePin}
            placeholder={"Enter Game Pin"}
            onChange={(un: string) => setGamePin(un)}
            disabled={!isGamePinEditable}
          />
          <div className="authentication button-container">
            <Button
              disabled={!inputIsValid()}
              className={"authentication"}
              width="100%" 
              onClick={() => {
                joinGame(gamePin, playerName, showError)
                navigate("game/lobby/" + gamePin);
              }}>
              Join Game
            </Button>
          </div>
          <div className="authentication link-container">
            <Button className="authentication link-button" onClick={handleRegisterClick}>
              Register here
            </Button>
            <Button className="authentication link-button" onClick={handleLoginClick}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Home;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "helpers/api";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import Header from "components/views/Header";

const Home = () => {
  const navigate = useNavigate();
  const [gamePin, setGamePin] = useState("");
  const [playerName, setPlayerName] = useState("");

  const joinGame = async () => {
    try {


      // Construct the request body
      const requestBody = {
        displayName: playerName
      };

      const response = await api.post(`/game/${gamePin}/join`, requestBody);

      // Handle response as needed, e.g., updating localStorage, navigating
      console.log(response.data);
      localStorage.setItem("gameId", gamePin);
      localStorage.setItem("playerId", response.data);

      navigate(`/lobby/${gamePin}`);
    } catch (error) {
      console.error("Error joining game:", error);
      alert("Error joining game. Please try again.");
    }
  };
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
            />
          </div>
          <div className="login button-container">
            <Button width="100%" onClick={joinGame}>
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
            <div className="login register-link" onClick={handleRegisterClick}>
              Register here.
            </div>
            <div className="login login-link" onClick={handleLoginClick}>
              Login
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Home;

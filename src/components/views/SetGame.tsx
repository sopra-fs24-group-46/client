import React, { useState } from "react";
import PropTypes from "prop-types";
import { api } from "helpers/api";

import "styles/views/SetGame.scss";
import { Button } from "components/ui/Button"; // Import the Button component
import { useNavigate, Link } from "react-router-dom";
import "styles/views/Header.scss";
import BaseContainer from "components/ui/BaseContainer";




//TODO change values for different inputs
const NumberInput = ({ label, value, onChange }) => {
  
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  const options = [];
  for (let i = 1; i <= 15; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div className="number-input">
      <label>{label}</label>
      <select value={value} onChange={handleChange}>
        {options}
      </select>
    </div>
  );
};

NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const SetGame = () => {
  const [maxPlayers, setMaxPlayers] = useState(1);
  const [rounds, setRounds] = useState(1);
  const [guessingTime, setGuessingTime] = useState(1);
  const host = localStorage.getItem("id");

  const navigate = useNavigate();

  const createGame = async () => {
    try {
      // Save user credentials for verification process
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      const gameId = localStorage.getItem("gameId");

      // Explicitly convert values to integers
      const maxPlayersInt = parseInt(maxPlayers);
      const roundsInt = parseInt(rounds);
      const guessingTimeInt = parseInt(guessingTime);
      
      // Construct the request body
      const requestBody = {
        id: id,
        token: token,
        maxPlayers: maxPlayersInt,
        rounds: roundsInt,
        guessingTime: guessingTimeInt,
      };
  
      // Send a PUT request to the backend
      const response = await api.put(`/game/${localStorage.getItem("gameId")}/updateSettings`, requestBody);

      console.log('Lobby created');

      // Open the lobby first before starting the game
      await api.post(`/game/${gameId}/openLobby`, requestBody);

      // Redirect to "/lobby" after successful creation
      navigate(`/lobby/${localStorage.getItem("gameId")}`);
    } catch (error) {
      // Handle errors
      console.error("Error creating game:", error);
    }
  };
  const goBacktoProfile = () => {
    localStorage.removeItem("gameId");

    navigate("/profile");
    <Link to="/profile">Go Back</Link>

  };

  return (
    <BaseContainer>

      <div className="header container_title1">
        <h1 className="header title1">
          CREATE CUSTOM GAME
        </h1>
      </div>
      <div className="set-game container">
          <h2>Game Settings</h2>
          <div className="set-game inputs">
            <NumberInput
              label="Max number of players"
              value={maxPlayers}
              onChange={setMaxPlayers}
            />
            <NumberInput
              label="Amount of rounds"
              value={rounds}
              onChange={setRounds}
            />
            <NumberInput
              label="Guessing time per round"
              value={guessingTime}
              onChange={setGuessingTime}
            />
          </div>
          <div className="set-game button_container">
            <Button onClick={createGame}>Create Game</Button> {/* Add the Create Game button */}
            <Button onClick={() => goBacktoProfile()}>Go Back</Button>
          </div>
      </div>
    
    </BaseContainer>
    

  );
};

export default SetGame;
import React, { useState } from "react";
import PropTypes from "prop-types";
import "styles/views/SetGame.scss";
import { Button } from "components/ui/Button"; // Import the Button component
import { useNavigate } from "react-router-dom";





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
  const navigate = useNavigate();


  const createGame = () => {
    // Logic for creating the game
    console.log("Game created!");
  };

  const goBacktoProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="set-game-container">
      <div className="set-game-content">
        <h2>Game Settings</h2>
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
        <Button onClick={createGame}>Create Game</Button> {/* Add the Create Game button */}
        <Button 
              onClick={() => goBacktoProfile()}>
                  Go Back            </Button>
      </div>
    </div>
  );
};

export default SetGame;
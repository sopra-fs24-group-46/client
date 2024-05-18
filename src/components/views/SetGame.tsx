import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { api, handleError, shortError} from "helpers/api";

import "styles/views/SetGame.scss";
import { Button } from "components/ui/Button"; // Import the Button component
import { useNavigate, Link } from "react-router-dom";
import "styles/views/Header.scss";
import BaseContainer from "components/ui/BaseContainer";
import { FormField } from "components/ui/FormFieldString";
import {MultiSelection} from "components/ui/MultiSelection";
import ValidatedTextInput from "components/ui/ValidatedTextInput";
import SelectRegion from "components/ui/SelectRegion";
import { useError } from "components/ui/ErrorContext";
import { Storage } from "helpers/LocalStorageManagement";
import { easy_names, medium_names } from "helpers/Constants";




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
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [rounds, setRounds] = useState(4);
  const [guessingTime, setGuessingTime] = useState(15);
  const [locationTypes, setLocationTypes] = useState([]);
  const [region, setRegion] = useState(null);
  const [regionType, setRegionType] = useState(null);
  const [names, setNames] = useState(null);
  const { showError } = useError();
  const [difficulty, setDifficulty] = useState("HARD");

  const [lakesBool, setLakesBool] = useState(false);
  const [mountainsBool, setMountainsBool] = useState(false);
  

  const navigate = useNavigate();

  const createGame = async () => {


    try {
      // Save user credentials for verification process
      const {id, token} = Storage.retrieveUser();
      const {gameId, playerId} = Storage.retrieveGameIdAndPlayerId();

      // Explicitly convert values to integers
      const maxPlayersInt = parseInt(maxPlayers);
      const roundsInt = parseInt(rounds);
      const guessingTimeInt = parseInt(guessingTime);

      // Validation checks
      if (roundsInt <= 0) {
        showError("Please enter a value greater than 0 for rounds.");
        return;
      }
      if (guessingTimeInt <= 1) {
        showError("Please enter a guessing time greater than 1.");
        return;
      }

      console.log(locationTypes);

      // Construct the request body
      const requestBody = {
        id: id,
        token: token,
        maxPlayers: maxPlayersInt,
        rounds: roundsInt,
        guessingTime: guessingTimeInt,
        locationTypes: locationTypes,
        region: region,
        regionType: regionType,
        locationNames: loadNamesForDifficulty(difficulty),
      };

      // Send a PUT request to the backend
      console.log(requestBody);
      const response = await api.put(`/game/${gameId}/updateSettings`, requestBody);

      console.log(requestBody.locationTypes);
      console.log('Lobby created' + response.data);

      const credentials = {
        id: id,
        token: token,
      }
      // Open the lobby first before starting the game
      await api.post(`/game/${gameId}/openLobby`, credentials);

      // Redirect to "/lobby" after successful creation
      navigate(`/game/lobby/${gameId}`);
    } catch (error) {
      // Handle errors
      showError("Creating game failed: " + shortError(error));
    }
  };

  const goBacktoProfile = () => {
    Storage.removeGameIdAndPlayerId();

    navigate("/profile");

  };
  
  const isFormValid = () => {
    if (region !== null && region !== "" && regionType === null) return false;
    return true;
  }

  const setLimits = (minVal, maxVal, newValue) => {
    // Ensure the new value is within the desired range
    newValue = Math.min(Math.max(minVal, newValue), maxVal); // Limits the value between 1 and 5
    // Update the state with the limited value

    return(newValue)
  };

  const toggleLocationTypes = (location) => {
    if (locationTypes.includes(location)) {
      setLocationTypes(locationTypes.filter((loc) => loc !== location));
    } else {
      setLocationTypes([...locationTypes, location]);
    }
  };

  return (
    <BaseContainer>

      <h1 className="header1 setGame">CREATE CUSTOM GAME</h1>

      <div className="set-game container">
        <div className="set-game title-container">
          <div className="set-game title">
            Choose your settings
          </div>
        </div>
          <div className="set-game inputs">
            
            <FormField
              className="setGame"
              label="Max number of players:"
              type ="number"
              placeholder="4"
              value={maxPlayers}
              onChange={(n) => setMaxPlayers(setLimits(1, 5, parseInt(n)))}
              min={1}
              max={5}
            />
            <FormField
              className="setGame"
              label="Amount of rounds:"
              type="number"
              placeholder="4"
              value={rounds}
              onChange={(n) => setRounds(setLimits(1, 10, parseInt(n)))}
              min={1}
              max={10}
            />
            <FormField
              className="setGame"
              label="Guessing time per round:"
              type="number"
              placeholder="15"
              value={guessingTime}
              onChange={(n) => setGuessingTime(setLimits(1, 120, parseInt(n)))}
              min={1}
              max={120}
            />
          </div>
          <div className="set-game locationTypes-text">Choose the location types:</div>
          <div className="set-game locationTypes-container">
            <Button onClick={() => toggleLocationTypes('LAKE')}
            className={locationTypes.includes("LAKE") ? "selected" : ""}>Lakes</Button>
            <Button onClick={() => toggleLocationTypes('ALPINE_MOUNTAIN')}
            className={locationTypes.includes("ALPINE_MOUNTAIN") ? "selected" : ""}>Mountains</Button>
          </div>
          <div className="set-game difficulty-text">Choose difficulty:</div>
          <div>
            <Button onClick={() => setDifficulty("EASY")}
            className={difficulty === "EASY" ? "selected" : ""}> Easy</Button>
            <Button onClick={() => setDifficulty("MEDIUM")}
            className={difficulty === "MEDIUM" ? "selected" : ""}> Medium</Button>
            <Button onClick={() => setDifficulty("HARD")}
            className={difficulty === "HARD" ? "selected" : ""}> Hard</Button>
          </div>

          <SelectRegion region={region} setRegion={setRegion} regionType={regionType} setRegionType={setRegionType} dropDownMaxHeight={"40vh"} />

          <div className="set-game button_container">
            <Button onClick={createGame} disabled={!isFormValid()}>Create Game</Button> {/* Add the Create Game button */}
            <Button onClick={() => goBacktoProfile()}>Go Back</Button>
          </div>
      </div>
    
    </BaseContainer>
    

  );
};

export default SetGame;

const locationNames = ["Alpine Peaks", "Mountains", "Main Hills", "Hills", "Lakes"];
const locationTypes = ["ALPINE_MOUNTAIN", "MOUNTAIN", "MAIN_HILL", "HILL", "LAKE"];
const fromNamesToLocationTypes = (names: string[]) => {
  return names.map((name) => {
    let index = locationNames.indexOf(name);
    return locationTypes[index];
  });
}

const loadNamesForDifficulty = (difficulty: string) => {
  switch (difficulty) {
    case "EASY":
      return easy_names;
    case "MEDIUM":
      return medium_names;
    case "HARD":
      return null;
  }
}
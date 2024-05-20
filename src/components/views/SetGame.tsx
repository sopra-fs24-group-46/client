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
import { getGameState } from "components/game/GameApi";




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
  const [advancedFilteringIsOn, setIsOn] = useState(false);

  const [lakesBool, setLakesBool] = useState(false);
  const [mountainsBool, setMountainsBool] = useState(false);
  

  const navigate = useNavigate();
  
  useEffect(() => {
    const init = async () => {
      const gameState = await getGameState();
      if (gameState && gameState.gameState !== "SETUP") {
        navigate("/game/back_to_game");
      }
    }
    
    init();
  }, []);

  const callServerCreateGame = async (locationTypes) => {
    
    // Save user credentials for verification process
    const { id, token } = Storage.retrieveUser();
    const { gameId, playerId } = Storage.retrieveGameIdAndPlayerId();
    
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
    
    if (locationTypes.length === 0) {
      showError("Please choose a location type.");
      return;
    }
    

    const tempRegion = advancedFilteringIsOn ? region : null;
    // Construct the request body
    const requestBody = {
      id: id,
      token: token,
      maxPlayers: maxPlayersInt,
      rounds: roundsInt,
      guessingTime: guessingTimeInt,
      questionTime: 5,
      locationTypes: locationTypes,
      region: tempRegion,
      regionType: regionType,
      locationNames: loadNamesForDifficulty(difficulty),
    };
    
    const credentials = {
      id: id,
      token: token,
    }
    try {
      // Send a PUT request to the backend
      console.log(requestBody);
      const response = await api.put(`/game/${gameId}/updateSettings`, requestBody);
      
      console.log(requestBody.locationTypes);
      console.log('Lobby created' + response.data);

      // Open the lobby first before starting the game
      await api.post(`/game/${gameId}/openLobby`, credentials);

      // Redirect to "/lobby" after successful creation
      navigate(`/game/${gameId}`);
    } catch (error) {
      throw error;
    }
  }

  const createGame = async () => {
    try {
      await callServerCreateGame(locationTypes);
      // await throwsError();
      return;
    } catch (error) {

      if (!(advancedFilteringIsOn && locationTypes.includes("ALPINE_MOUNTAIN"))) {
        showError("Creating game failed: \n " + shortError(error));
        // only go on if advanced settings are on and mountain is selected
        return;
      }
    }
    
    // trying to add location types until enough data to play the game is available
    let incrementalLocationTypes = locationTypes;
    incrementalLocationTypes = [...incrementalLocationTypes, "MOUNTAIN"];
    try { await callServerCreateGame(incrementalLocationTypes); return; } catch (error) { };
    incrementalLocationTypes = [...incrementalLocationTypes, "MAIN_HILL"];
    try { await callServerCreateGame(incrementalLocationTypes); return; } catch (error) { };
    incrementalLocationTypes = [...incrementalLocationTypes, "HILL"];
    try { await callServerCreateGame(incrementalLocationTypes); return; } catch (error) {
        showError("Creating game failed hard: " + shortError(error));
    };
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

  const toggleSwitch = () => {

    setIsOn(!advancedFilteringIsOn);

    if (!advancedFilteringIsOn) {
      setDifficulty("HARD");
    }
  };

  const toggleLocationTypes = (location) => {
    if (locationTypes.includes(location)) {
      setLocationTypes(locationTypes.filter((loc) => loc !== location));
    } else {
      setLocationTypes([...locationTypes, location]);
    }
  };

  const setDifficultyFunc = (difficultyString) => {

    if (!advancedFilteringIsOn) {
      setDifficulty(difficultyString);
    } else {
      setDifficulty("HARD");
    }

  }

  return (
    <BaseContainer>

      <h1 className="header1 setGame">CREATE CUSTOM GAME</h1>

      <div className="set-game content">

        <div className="set-game settings-content">

          <div className="set-game container basic-settings">
            <div className="set-game boxTitle">
                Choose settings:
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
          </div>

          <div className="set-game container location-settings">

            <div className="set-game boxTitle">Choose location types:</div>
            <div className="set-game locationTypes-container">
              <Button onClick={() => toggleLocationTypes('LAKE')}
              className={locationTypes.includes("LAKE") ? "selected" : ""}>Lakes</Button>
              <Button onClick={() => toggleLocationTypes('ALPINE_MOUNTAIN')}
              className={locationTypes.includes("ALPINE_MOUNTAIN") ? "selected" : ""}>Mountains</Button>
            </div>
            <div className="set-game boxTitle">Choose difficulty:</div>
            <div className="set-game difficulty-container">
              <Button onClick={() => setDifficultyFunc("EASY")}
              className={difficulty === "EASY" ? "selected" : ""}> Easy</Button>
              <Button onClick={() => setDifficultyFunc("MEDIUM")}
              className={difficulty === "MEDIUM" ? "selected" : ""}> Medium</Button>
              <Button onClick={() => setDifficultyFunc("HARD")}
              className={difficulty === "HARD" ? "selected" : ""}> Hard</Button>
            </div>
          </div>

          <div className="set-game container advanced-settings">
            <div className="set-game advancedSettings-switchButton">
              <div className="set-game advancedSettings-title">Advanced settings:</div>
              <div className={`set-game switch ${advancedFilteringIsOn ? 'on' : 'off'}`} onClick={toggleSwitch}>
                  <div className="set-game toggle"></div>
              </div>
            </div>
            {advancedFilteringIsOn && (
              <div className="set-game advancedSettings-container">
                
                <SelectRegion 
                  region={region} 
                  setRegion={setRegion} 
                  regionType={regionType} 
                  setRegionType={setRegionType} 
                  dropDownMaxHeight={"40vh"} 
                />
                <div className="set-game advancedSettings-text">
                  ATTENTION: Using advanced settings will automatically set the difficulty to HARD.
                </div>
              </div>
            )}
          </div>

        </div>

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
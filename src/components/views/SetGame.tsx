import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { api, handleError, shortError} from "helpers/api";

import "styles/views/SetGame.scss";
import { Button } from "components/ui/Button"; // Import the Button component
import { useNavigate, Link } from "react-router-dom";
import "styles/views/Header.scss";
import BaseContainer from "components/ui/BaseContainer";
import {FormField} from "components/ui/FormField";
import {MultiSelection} from "components/ui/MultiSelection";
import ValidatedTextInput from "components/ui/ValidatedTextInput";
import SelectRegion from "components/ui/SelectRegion";
import ErrorBox from "components/ui/ErrorBox";




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
  const host = localStorage.getItem("id");
  const [errorMessage, setErrorMessage] = useState("");

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

      // Validation checks
      if (roundsInt <= 0) {
        alert("Please enter a value greater than 0 for rounds.");
        return;
      }
      if (guessingTimeInt <= 1) {
        alert("Please enter a guessing time greater than 1.");
        return;
      }

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
        names: names,
      };

      // Send a PUT request to the backend
      console.log(requestBody);
      const response = await api.put(`/game/${localStorage.getItem("gameId")}/updateSettings`, requestBody);

      console.log(requestBody.locationTypes);
      console.log('Lobby created' + response.data);

      const credentials = {
        id: id,
        token: token,
      }
      // Open the lobby first before starting the game
      await api.post(`/game/${gameId}/openLobby`, credentials);

      // Redirect to "/lobby" after successful creation
      navigate(`/lobby/${localStorage.getItem("gameId")}`);
    } catch (error) {
      // Handle errors
      setErrorMessage(shortError(error));
      console.error("Error creating game:", handleError(error));
    }
  };

  const goBacktoProfile = () => {
    localStorage.removeItem("gameId");

    navigate("/profile");
    <Link to="/profile">Go Back</Link>

  };
  
  const isFormValid = () => {
    if (region !== null && region !== "" && regionType === null) return false;
    return true;
  }

  return (
    <BaseContainer>

      <ErrorBox message={errorMessage} onClose={() => setErrorMessage("")} />
      <div className="header container_title1">
        <h1 className="header title1">
          CREATE CUSTOM GAME
        </h1>
      </div>
      <div className="set-game container">
          <h2>Game Settings</h2>
          <div className="set-game inputs">
            
            <FormField
              label="Max number of players"
              type ="number"
              placeholder="4"
              value={maxPlayers}
              onChange={setMaxPlayers}
              style = {{width: "50px"}}
            />
            <FormField
              label="Amount of rounds"
              type="number"
              placeholder="4"
              value={rounds}
              onChange={setRounds}
              style = {{width: "50px"}}
            />
            <FormField
              label="Guessing time per round"
              type="number"
              placeholder="4"
              value={guessingTime}
              onChange={setGuessingTime}
              style = {{width: "50px"}}
            />
          </div>
          <MultiSelection 
            label = "Locations" 
            options = {["ALPINE_MOUNTAIN", "MOUNTAIN","MAIN_HILL", "HILL", "LAKE"]} 
            onChange = {setLocationTypes}
          />
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

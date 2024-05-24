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
import LeaderBoard from "components/game/LeaderBoard";
import NameFilter from "components/ui/NameFilter";
import StoreNLoadSettings from "components/ui/StoreNLoadSettings";
import RuleLink from "components/ui/RuleLink";




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

interface Settings {
  id: string;
  token: string;
  name: string;

  maxPlayers: number;
  rounds: number;

  locationTypes: string[];
  region: string;
  regionType: string;
  locationNames: string[];

  questionTime: number;
  guessingTime: number;
  mapRevealTime: number;
  leaderBoardTime: number;
}

const AdvancedSettings = () => {
  const navigate = useNavigate(); 
  const { showError } = useError();
  const { id, token } = Storage.retrieveUser();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    id: id,
    token: token,
    name: "",

    maxPlayers: 4,
    rounds: 4,

    locationTypes: ["LAKE"],

    region: null,
    regionType: null,
    locationNames: [],

    questionTime: 5,
    guessingTime: 15,
    mapRevealTime: 15,
    leaderBoardTime: 10,
  })
  const [regionFilter, setRegionFilter] = useState(false);
  const [nameFilter, setNameFilter] = useState(false);
  const [polygonFilter, setPolygonFilter] = useState(false);

  useEffect(() => {
    const init = async () => {
      const gameState = await getGameState();
      if (gameState && gameState.gameState !== "SETUP") {
        navigate("/game/back_to_game");
      }
    }
    init();
  }, []);

  const loadSetting = (setting) => {
    setting.id = id;
    setting.token = token;
    setting.locationNames = setting.locationNames ?? [];
    setNameFilter(setting.locationNames.length > 0);
    setRegionFilter(setting.region !== null && setting.regionType !== null);
    setSettings(setting);
  }
  const callServerCreateGame = async () => {
    
    // Save user credentials for verification process
    const { id, token } = Storage.retrieveUser();
    const { gameId, playerId } = Storage.retrieveGameIdAndPlayerId();
    
    // Explicitly convert values to integers

    const requestBody = settings;

    requestBody.id = id;
    requestBody.token = token;
    requestBody.locationNames = nameFilter ? settings.locationNames : null;
    requestBody.region = regionFilter ? settings.region : null; 
    requestBody.regionType = regionFilter ? settings.regionType : null;

    const credentials = {
      id: id,
      token: token,
    }
    setIsLoading(true);
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
      await callServerCreateGame();
      // await throwsError();
      return;
    } catch (error) {
      showError("Creating game failed. Not enough Mountains/Lakes available for " + settings.rounds + " rounds: \n " + shortError(error));
    }
    setIsLoading(false);
  };

  const backToSimpleSettings = () => {
    navigate("/game/create");
  };
  
  const setLimits = (minVal, maxVal, newValue) => {
    // Ensure the new value is within the desired range
    newValue = Math.min(Math.max(minVal, newValue), maxVal); // Limits the value between 1 and 5
    // Update the state with the limited value

    return(newValue)
  };

  const toggleRegionFilter = () => {
    setRegionFilter(!regionFilter);
  };

  const toggleNameFilter = () => {
    setNameFilter(!nameFilter);
  };

  const togglePolygonFilter = () => {
    setPolygonFilter(!polygonFilter);
  };

  const toggleLocationTypes = (location: Array<string>) => {
    let locationTypes = settings.locationTypes;
    if (locationTypes.includes(location[0])) {
      locationTypes =(locationTypes.filter((loc) => !(location.includes(loc))));
    } else {
      locationTypes =([...locationTypes, ...location]);
    }
    updateSettings("locationTypes", locationTypes);
  };
  
  const updateSettings = (key: string, value) => {
    setSettings((prevSettings) => ({ ...prevSettings, [key]: value }));
  };


  return (
    <BaseContainer>
      <RuleLink />
      <h1 className="header1 setGame">Advanced Settings</h1>
      <h1 className="header tiny">Advanced</h1>

      <div className="set-game content">
        <div className="set-game settings-content">

          <div className="set-game column">

          <div className="set-game container basic-settings">
            <div className="set-game boxTitle">
                General:
            </div>

            <div className="set-game inputs">
              
              <FormField
                className="setGame"
                label="Max number of players:"
                type ="number"
                placeholder="4"
                value={settings.maxPlayers}
                onChange={(n) => updateSettings("maxPlayers",(setLimits(1, 5, parseInt(n))))}
                min={1}
                max={5}
              />
              <FormField
                className="setGame"
                label="Amount of rounds:"
                type="number"
                placeholder="4"
                value={settings.rounds}
                onChange={(n) => updateSettings("rounds",(setLimits(1, 10, parseInt(n))))}
                min={1}
                max={10}
              />
              <FormField
                className="setGame"
                label="Time choosing PowerUps:"
                type="number"
                placeholder="5"
                value={settings.questionTime}
                onChange={(n) => updateSettings("questionTime", setLimits(1, 120, parseInt(n)))}
                min={1}
                max={120}
              />
              <FormField
                className="setGame"
                label="Guessing time per round:"
                type="number"
                placeholder="15"
                value={settings.guessingTime}
                onChange={(n) => updateSettings("guessingTime",(setLimits(1, 120, parseInt(n))))}
                min={1}
                max={120}
              />
              <FormField
                className="setGame"
                label="Time showing results:"
                type="number"
                placeholder="15"
                value={settings.mapRevealTime}
                onChange={(n) => updateSettings("mapRevealTime", setLimits(1, 120, parseInt(n)))}
                min={1}
                max={120}
              />
              <FormField
                className="setGame"
                label="Time showing leaderboard:"
                type="number"
                placeholder="10"
                value={settings.leaderBoardTime}
                onChange={(n) => updateSettings("leaderBoardTime", setLimits(1, 120, parseInt(n)))}
                min={1}
                max={120}
              />
            </div>
          </div>

          </div>

          <div className="set-game column">

          <div className="set-game container basic-settings">
            <StoreNLoadSettings
              settings={settings}
              setSettings={loadSetting}
              name={settings.name}
              setName={(n) => updateSettings("name", n)}
            />
          </div>
          <div className="set-game container location-settings">

            <div className="set-game boxTitle">Location types:</div>
            <div className="set-game locationTypes-container" style={{width: "100%"}}>
              <Button onClick={() => toggleLocationTypes(['LAKE'])}
              style ={{width: "30%", marginRight: "5%"}}
              className={settings.locationTypes.includes("LAKE") ? "selected" : ""}>Lakes</Button>
                <Button onClick={() => toggleLocationTypes(['ALPINE_MOUNTAIN', 'MOUNTAIN']) }
              style ={{width: "30%", marginRight: "5%"}}
              className={settings.locationTypes.includes("MOUNTAIN") ? "selected" : ""}>Mountains</Button>
                <Button onClick={() => toggleLocationTypes(['HILL', 'MAIN_HILL'])}
              style ={{width: "30%"}}
              className={settings.locationTypes.includes("HILL") ? "selected" : ""}>Hills</Button>
            </div>
          </div>

            
          <div className="set-game container advanced-settings">
            <div className="set-game advancedSettings-switchButton">
              <div className="set-game advancedSettings-title">Region Filter</div>
              <div className={`set-game switch ${regionFilter ? 'on' : 'off'}`} onClick={toggleRegionFilter}>
                  <div className="set-game toggle"></div>
              </div>
            </div>
            {regionFilter && (
              <div className="set-game advancedSettings-container">
                
                <SelectRegion 
                  region={settings.region} 
                  setRegion={(n) => updateSettings("region", n)} 
                  regionType={settings.regionType} 
                  setRegionType={(n) => updateSettings("regionType", n)} 
                  dropDownMaxHeight={"40vh"} 
                />
              </div>
            )}
          </div>

          <div className="set-game container advanced-settings">
            <div className="set-game advancedSettings-switchButton">
              <div className="set-game advancedSettings-title">Name Filter</div>
              <div className={`set-game switch ${nameFilter ? 'on' : 'off'}`} onClick={toggleNameFilter}>
                  <div className="set-game toggle"></div>
              </div>
            </div>
            {nameFilter && (
              <div className="set-game advancedSettings-container">
                
                <NameFilter
                  locationNames={settings.locationNames}
                  setLocationNames={(n) => updateSettings("locationNames", n)}
                  locationTypes={settings.locationTypes}
                  />
                  
              </div>
            )}
          </div>
          </div>

        </div>

        <div className="set-game button-container">
          <Button onClick={createGame}
          style={{ width: "100%", marginRight: "2%", marginLeft: "2%" }}
          >{isLoading ? "Loading..." : "Create Game"}</Button> {/* Add the Create Game button */}
          <Button onClick={() => backToSimpleSettings()}
          style={{ width: "100%" , marginRight: "2%"}}
          >Back to Normal Settings</Button>
        </div>

      </div>
    
    </BaseContainer>
    

  );
};

export default AdvancedSettings;

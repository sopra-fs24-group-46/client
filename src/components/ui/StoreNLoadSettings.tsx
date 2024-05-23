import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "./Button";
import ValidatedTextInput from "./ValidatedTextInput";
import { api, shortError } from "helpers/api";
import { useError } from "./ErrorContext";
import { Storage } from "helpers/LocalStorageManagement";


const StoreNLoadSettings = ({ settings, setSettings, ...props }) => {

  const [storedSettings, setStoredSettings] = useState([]);
  const {id, token} = Storage.retrieveUser();
  const { showError } = useError();
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await api.get(`/game/${id}/${token}/getStoredSettings`);
        setStoredSettings(response.data);
      } catch (error) {
        showError(shortError(error));
      }
    }

    loadSettings();
  }, [])
  const storeSettings = async () => {
    try {
      await api.post(`/game/storeSettings`, settings);
      setStoredSettings((prevSettings) => {
        const newSettings = prevSettings.filter(setting => setting.name !== settings.name);
        return [...newSettings, settings];
      });
    } catch (error) {
      showError(shortError(error));
    }
  };


  return (
    <div style={{display: "flex", flexDirection: "row", padding: "10px", gap: "10px"}}>
      <Button onClick={storeSettings}
        disabled={settings.name.length === 0}
      >Store Settings</Button>
<div>
        Stored Settings:
      <div style={{overflowY: "scroll", maxHeight: "20vh"}}>
        {storedSettings.map((settings) => (
          <div key={settings}
            onClick={() => setSettings(settings)}
            style={{ cursor: "pointer", onHover: { backgroundColor: "lightgray" } }}
          >{settings.name} 
            
          </div>
        ))}
      </div>
</div>
    </div>
  );
};

StoreNLoadSettings.propTypes = {
  settings: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  setSettings: PropTypes.func.isRequired,
};

export default StoreNLoadSettings;
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { useLocation } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import { api, handleError } from "helpers/api";

const Lobby = ({ fetchUsername }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Call the fetchUsername function passed as a prop
        const username = await fetchUsername();
        setUsername(username);
      } catch (error) {
        console.error("Error fetching username:", error);
        // Handle error appropriately
      }
    }

    fetchData();
  }, [fetchUsername]); // Include fetchUsername in the dependencies array

  const maxPlayers = queryParams.get("maxPlayers");
  const rounds = queryParams.get("rounds");
  const guessingTime = queryParams.get("guessingTime");

  return (
    <BaseContainer>
<h1 className="header title1">{username}&#39;s GAME LOBBY</h1>
      <div className="lobby container">
        <p>Max Players: {maxPlayers}</p>
        <p>Rounds: {rounds}</p>
        <p>Guessing Time: {guessingTime}</p>
      </div>
    </BaseContainer>
  );
};

// Add PropTypes validation for fetchUsername
Lobby.propTypes = {
  fetchUsername: PropTypes.func.isRequired,
};

export default Lobby;

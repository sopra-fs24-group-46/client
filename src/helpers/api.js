import axios from "axios";
import { getDomain } from "./getDomain";

export const api = axios.create({
  baseURL: getDomain(),
  headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
});

export const handleError = error => {
  const response = error.response;

  // catch 4xx and 5xx status codes
  if (response && !!`${response.status}`.match(/^[4|5]\d{2}$/)) {
    let info = `\nrequest to: ${response.request.responseURL}`;

    if (response.data.status) {
      info += `\nstatus code: ${response.data.status}`;
      info += `\nerror: ${response.data.error}`;
      info += `\nerror message: ${response.data.message}`;
    } else {
      info += `\nstatus code: ${response.status}`;
      info += `\nerror message:\n${response.data}`;
    }

    console.log("The request was made and answered but was unsuccessful.", error.response);
    
    return info;
  } else {
    if (error.message.match(/Network Error/)) {
      alert("The server cannot be reached.\nDid you start it?");
    }

    console.log("Something else happened.", error);
    
    return error.message;
  }
};

export const getAuthToken = () => {
  let token = localStorage.getItem("token");
  return  {
    headers: {
      token: token,
    },
  };
}

export const usePowerUp = async (powerUp) => {
    //Define current variables
    const gameId = localStorage.getItem("gameId");
    const playerId = localStorage.getItem("playerId");

    //Create requestBody
    const requestBody = {
      playerId: playerId,
      powerUp: powerUp,
    };

    try {

      //Start game in the backend
      const response = await api.post(`/game/${gameId}/powerup`, requestBody);

      //TODO Propper Error Handling
    } catch (error) {
      console.log(`Error Details: ${handleError(error)}`);
    }   
  }


// used in the MapEndpoint
// api.js
export const fetchGameData = async (gameId) => {
  try {
    const response = await fetch(`${getDomain()}game/${gameId}/getView`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching game state:', error);
    throw error;
  }
};

export const submitAnswer = async (gameId, playerId, coordinates) => {
  try {
    const response = await fetch(`${getDomain()}game/${gameId}/guess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gameId,
        playerId,
        x: coordinates.latitude,
        y: coordinates.longitude,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error submitting answer:', error);
    throw error;
  }
};
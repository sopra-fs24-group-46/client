import axios from "axios";
import { getDomain } from "./getDomain";

export const api = axios.create({
  baseURL: getDomain(),
  headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
});

export const shortError = error => {
  //check if error is defined
  handleError(error, console.error);
  if (!error || !error.response || !error.response.data) {
    return "No response data from Server. Did you start the server. \n" +error;
  }

  return `${error.response.data.message}`;
}

export const handleError = (error, showError=alert) => {
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
      showError("The server cannot be reached.\nDid you start it?");
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

export const usePowerUp = async (powerUp, showError = alert) => {
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
    showError(shortError(error));
  }   
}


export const getUser = async (id, token, showError=alert) => {
  try {

    const response = await api.get(`/users/${id}/${token}`);
    const user = response.data;

    if (!user) {
      throw new Error("User not found");
    }
    
    return user;
  } catch (error) {
    showError("Something went wrong while fetching the user!" + shortError(error));
    console.error("Details:", error);
  }
}
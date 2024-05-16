import { Storage } from "helpers/LocalStorageManagement";
import { api, shortError } from "helpers/api";

export const getGameState = async (showError = console.log) => {
  try {
    const {gameId, playerId} = Storage.retrieveGameIdAndPlayerId();
    const response = await api.get(`game/${gameId}/getGameState`);
    const data = response.data;

    return data;
  } catch (error) {
    showError(shortError(error));
  }
};

export const getSettings = async (showError = console.log) => {
  try {
    const {gameId, playerId} = Storage.retrieveGameIdAndPlayerId();
    const response = await api.get(`game/${gameId}/settings`);
    const data = response.data;

    return data;
  } catch (error) {
    showError(shortError(error));
  }
};

export const getGameView = async (showError = console.log) => {
  const {gameId, playerId} = Storage.retrieveGameIdAndPlayerId();

  const devData = JSON.parse(localStorage.getItem("devGameView"));
  if (gameId === null || playerId === null) {//returning dev data if in dev mode
    return devData;
  }

  try {
    const {gameId, playerId} = Storage.retrieveGameIdAndPlayerId();
    const response = await api.get(`game/${gameId}/getView`);
    const data = response.data;

    return data;
  } catch (error) {
    showError(shortError(error));
  }
};

export const submitAnswer = async (answer: {x: string, y: string} ,showError = console.log) => {
  const {gameId, playerId} = Storage.retrieveGameIdAndPlayerId();
  if (gameId === null) {
    return;
  }

  const requestBody = {
      playerId,
      x: answer.x,
      y: answer.y
  };

  try {
      const response = await api.post(`game/${gameId}/guess`, requestBody);
      console.log("Guess: "+requestBody.x+","+requestBody.y+" submitted. response: ", response);
  } catch (error) {
      showError(shortError(error));
  }
};

export const joinGame = async (gameId: string, name: string, navigate: any, showError = console.log) => {
  try {
    // Construct the request body
    const requestBody = {
      displayName: name
    };


    const response = await api.post(`/game/${gameId}/join`, requestBody);


    // Handle response as needed, e.g., updating localStorage, navigating
    console.log(response.data);
    Storage.storeGameIdAndPlayerId(gameId, response.data);

    navigate(`/game/lobby/${gameId}`);
  } catch (error) {
    showError(shortError(error));
  }

}
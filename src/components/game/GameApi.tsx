import { api, handleError } from "helpers/api";

export const getGameState = async () => {
  try {
    const gameId = localStorage.getItem("gameId");
    const response = await api.get(`game/${gameId}/getGameState`);
    const data = response.data;

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getSettings = async () => {
  try {
    const gameId = localStorage.getItem("gameId");
    const response = await api.get(`game/${gameId}/settings`);
    const data = response.data;

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getGameView = async () => {
  try {
    const gameId = localStorage.getItem("gameId");
    const response = await api.get(`game/${gameId}/getView`);
    const data = response.data;

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const storeSettings = (settings: any) => {
  try {
    localStorage.setItem("questionTime", settings.questionTime);
    localStorage.setItem("guessingTime", settings.guessingTime);
    localStorage.setItem("mapRevealTime", settings.mapRevealTime);
    localStorage.setItem("leaderBoardTime", settings.leaderBoardTime);
  } catch (error) {
    console.error("Error storing settings:", error);
  }
}

export const submitAnswer = async (gameId) => {
    const playerId = localStorage.getItem("playerId");
    const x = parseFloat(localStorage.getItem("x") || "0");
    const y = parseFloat(localStorage.getItem("y") || "0");

    const requestBody = {
        playerId,
        x,
        y
    };

    try {
        const response = await api.post(`game/${gameId}/guess`, requestBody);
        console.log(response);
    } catch (error) {
        console.log(`Error Details: ${handleError(error)}`);
    }
};
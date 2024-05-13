import { api } from "helpers/api";
import axios from "axios";


const joinGame = async (token, gameId, loggedInUser) => {
  try {
    const requestBody = {
      displayName: loggedInUser.username,
    };

    const response = await api.post(`/game/${gameId}/join`, requestBody);
    localStorage.setItem("gameId", gameId);
    localStorage.setItem("playerId", response.data);
    console.log('Joining game response:', response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Game not found!");
    } else {
      throw new Error("Error joining game: " + error.message);
    }
  }
};


export { joinGame };

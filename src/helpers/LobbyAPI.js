import { api } from "helpers/api";
import axios from "axios";
import { navigate, useNavigate } from "react-router-dom";


const joinGame = async (token, gameId, loggedInUser, navigateCallback) => {
  try {
    if (!token || !gameId) {
      alert("No Game Pin provided!");
    } else {
      const requestBody = {
        displayName: loggedInUser.username,
      };

      const response = await api.post(`/game/${gameId}/join`, requestBody);
      const navigate = useNavigate();

      localStorage.setItem("gameId", gameId);
      localStorage.setItem("playerId", response.data);
      console.log('Joining game response:', response.data);
      navigateCallback();    }
  } catch (error) {
    console.error("Error joining game:", error);
    alert("Game not found!");
  }
};

export { joinGame };

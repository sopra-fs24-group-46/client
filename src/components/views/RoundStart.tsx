import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "helpers/api";
import BaseContainer from "components/ui/BaseContainer";
import ProgressBar from "components/ui/ProgressBar";
import { Spinner } from "components/ui/Spinner";
import "styles/views/Round.scss";
import "styles/ui/Progressbar.scss";

const RoundStart = () => {
  const navigate = useNavigate();

  // State variables for game data
  const [gameSettings, setGameSettings] = useState(null);
  const [gameInfo, setGameInfo] = useState(null);
  const [currentRound, setCurrentRound] = useState(null);
  const [currentLocationName, setCurrentLocationName] = useState('');
  // Add more state variables as needed

  useEffect(() => {
    async function fetchGameSettings() {

      try {
        const intervalId = setInterval(getGameView, 5000);
        const response = await api.get(`/game/${localStorage.getItem("gameId")}/settings`);
        const data = response.data;
        setGameSettings(data);
        localStorage.setItem("questionTime", data.questionTime);
        localStorage.setItem("guessingTime", data.guessingTime);
        return () => clearInterval(intervalId);
        // instead of localStorage
      } catch (error) {
        console.error("Error fetching game settings:", error);
      }
    }

    async function getGameView() {
      try {
        const intervalId = setInterval(() => {

        })
        const gameId = localStorage.getItem("gameId");
        const response = await api.get(`game/${gameId}/getView`);
        const data = response.data;
        setGameInfo(data);
        // Update state variables with game view data
        setCurrentRound(data.currentRound);
        localStorage.setItem("currentLocationName", data.currentQuestion.location_name);
        localStorage.setItem("currentRound", data.currentRound);

        // Add more state updates as needed
      } catch (error) {
        console.error("Error fetching game view:", error);
      }
    }

    fetchGameSettings();
    getGameView();
  }, []);

  const handleProgressBarFinish = () => {
    navigate(`/game/${localStorage.getItem("gameId")}/round/${currentRound}/guessing`);
  };

  let content = <Spinner />;
  if (gameSettings && gameInfo) {
    content = (
        <div>
          <h1 className="header title1">Round {localStorage.getItem('currentRound')}</h1>
          <div className="round container">
            <div className="round text_container">
              <div>Try to find this Mountain:</div>
              <div>{localStorage.getItem('currentLocationName')}</div>
            </div>
            <div className="round powerups_container">Powerups will be added here</div>
            <ProgressBar durationInSeconds={localStorage.getItem('questionTime')} onFinish={handleProgressBarFinish} />
          </div>
        </div>
    );
  }

  return <BaseContainer>{content}</BaseContainer>;
};

export default RoundStart;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "helpers/api";
import BaseContainer from "components/ui/BaseContainer";
import ProgressBar from "components/ui/ProgressBar";
import { Spinner } from "components/ui/Spinner";
import "styles/views/Round.scss";
import "styles/ui/Progressbar.scss";
import { getDomain } from "helpers/getDomain";
import { PowerUpBar, PowerUpOverlay } from "components/ui/PowerUp";
import PropTypes from "prop-types";

const RoundStart = ({ setRoundState }) => {
  const navigate = useNavigate();

  // State variables for game data
  const [gameSettings, setGameSettings] = useState(null);
  const [gameInfo, setGameInfo] = useState(null);
  const [currentRound, setCurrentRound] = useState(null);
  const [powerUpInUse, setPowerUpInUse] = useState(null);
  const [usedPowerUps, setUsedPowerUps] = useState([]);
  // Add more state variables as needed

  useEffect(() => {
    async function fetchGameSettings() {
      try {
        const intervalId = setInterval(getGameView, 5000);
        const response = await api.get(
          `/game/${localStorage.getItem("gameId")}/settings`
        );
        const data = response.data;
        setGameSettings(data);
        localStorage.setItem("questionTime", data.questionTime);
        localStorage.setItem("guessingTime", data.guessingTime);
        localStorage.setItem("mapRevealTime", data.mapRevealTime);
        localStorage.setItem("leaderBoardTime", data.leaderBoardTime);

        return () => clearInterval(intervalId);
        // instead of localStorage
      } catch (error) {
        console.error("Error fetching game settings:", error);
      }
    }

    async function getGameView() {
      try {
        const intervalId = setInterval(() => {});
        const gameId = localStorage.getItem("gameId");
        const response = await api.get(`game/${gameId}/getView`);
        const data = response.data;
        setGameInfo(data);
        // Update state variables with game view data
        setCurrentRound(data.currentRound);
        localStorage.setItem(
          "currentLocationName",
          data.currentQuestion.location_name
        );
        localStorage.setItem("currentRound", data.currentRound);

        // Add more state updates as needed
      } catch (error) {
        console.error("Error fetching game view:", error);
      }
    }

    fetchGameSettings();
    getGameView();
  }, []);

  //Gets gameView JSON-File every 0.5 seconds
  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameId = localStorage.getItem("gameId");

        const response = await fetch(`${getDomain()}game/${gameId}/getView`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        const roundState = jsonData.roundState;
        //used for powerup buttons
        const playerId = localStorage.getItem("playerId");
        setPowerUpInUse(jsonData.powerUps[playerId]);
        console.log(jsonData.powerUps[playerId]);
        setUsedPowerUps(jsonData.usedPowerUps[playerId]);

        console.log(roundState);

        //Switch to Guessing View as soon as BE changes
        if (roundState === "GUESSING") {
          console.log("NOW GUESSING");
          setRoundState(roundState);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const intervalId = setInterval(fetchData, 500);

    // Cleanup function to clear the interval when component unmounts or useEffect runs again
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run effect only once on mount

  const handleProgressBarFinish = () => {
    //navigate(`/game/${localStorage.getItem("gameId")}/round/${currentRound}/guessing`);
  };

  //TODO Set durationsInSeconds to questionTime
  let content = <Spinner />;
  if (gameSettings && gameInfo) {
    content = (
      <div>
        <PowerUpOverlay powerUp={powerUpInUse} />
        <h1 className="header title1">
          Round {localStorage.getItem("currentRound")}
        </h1>
        <div className="round container">
          <div className="round text_container">
            <div>Try to find this Mountain:</div>
            <div>{localStorage.getItem("currentLocationName")}</div>
          </div>
          <PowerUpBar
            inUseList={[powerUpInUse]}
            disabledList={usedPowerUps}
            disableAll={powerUpInUse !== null}
          />
          <ProgressBar
            durationInSeconds={4}
            onFinish={handleProgressBarFinish}
          />
        </div>
      </div>
    );
  }

  return <BaseContainer>{content}</BaseContainer>;
};

RoundStart.propTypes = {
  setRoundState: PropTypes.func.isRequired,
};

export default RoundStart;

//In the folder game all the components and views for the game are defined
//GameView is the only View of the game.
//In this GameView components for each screen are used and loaded as needed.
//The other files in this folder contain function and components for the game.
//Mentally we can still think of the four views (Question, Guessing, MapReveal, LeaderBoard)
//all view specific code should be in the corresponding files.
//GameView only glues everything together.
//Common components, like a Map, Button and so on should be defined in their own files as well.
//This is done to have one central map component which is only loaded once.

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { api } from "helpers/api";

import { Button } from "components/ui/Button";

import "styles/views/MapContainer.scss";
import MapBoxComponent from "components/ui/MapBoxComponentMemo";

import RoundStart from "components/game/RoundStart";
import Guessing from "components/game/Guessing";
import MapReveal from "components/game/MapReveal";
import LeaderBoard from "components/game/LeaderBoard";
import BaseContainer from "components/ui/BaseContainer";
import { getGameState, getSettings, getGameView, storeSettings, storeDevGameViewJson} from "./GameApi";

const GameView = () => {
  const [answers, setAnswers] = useState([]);
  const [currentQuestionLocation, setCurrentQuestionLocation] = useState(null);
  const [mapReveal, setMapReveal] = useState(false);
  const [runFlag, setRunFlag] = useState(false);
  const [roundState, setRoundState] = useState("QUESTION");
  const [roundStateProgress, setRoundStateProgress] = useState(0); //0 to 100
  const navigate = useNavigate();

  useEffect(() => {
    //this is executed every 500ms
    const updateGameState = async () => {
      try {
        const gameState = await getGameState();
        console.log(gameState);
        setRoundState(gameState.roundState);
        setRoundStateProgress(100 * (gameState.timeTillNextPhaseInMillis / phaseTimeInMillis(gameState.roundState)));
        

        if (gameState.roundState === "MAP_REVEAL") {
          setMapReveal(1);
        } else{
          setMapReveal(0);
        }
        if (gameState.roundState === "QUESTION") {
          if (runFlag === false) {
            executeOnNewRound();
            setRunFlag(true);
          }
        } else {
          setRunFlag(false);
        }
        if (gameState.gameState !== "PLAYING") {
          const gameId = localStorage.getItem("gameId");
          const playerId = localStorage.getItem("playerId");
          if (gameId !== null && playerId !== null) {//only navigate if in game mode
            navigate("../game/ended");
          }
        }
      } catch (error) {
        
      }
    }
    
    const executeOnNewRound = async () => {
      try {
        const gameView = await getGameView();
        setCurrentQuestionLocation(gameView.currentQuestion.location);
        console.log(gameView.currentQuestion.location);
      } catch (error) {
        console.error("Error fetching game view:", error);
      }
    }

    //this is executed once
    const init = async () => {
      const settings = await getSettings();
      storeSettings(settings);
    }

    init();
    const intervalId = setInterval(updateGameState, 500);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <BaseContainer>
      {
      (localStorage.getItem("playerId") === null || localStorage.getItem("gameId") === null) ?
          (<NavigateButtons roundState={roundState} setRoundState={setRoundState} goToEndView={() => navigate("../game/ended")} />)
          : null
      }
      
      
      <GameViewChild state={roundState} setAnswers={setAnswers} />
      
      <div className="map container">
        <MapBoxComponent
          currentQuestionLocation={currentQuestionLocation ?? null}
          reveal={mapReveal ?? 0}
          guessesMapReveal={answers ?? []}
        />
      </div>
    </BaseContainer>
  );
};

//these are the different round states.
const GameViewChild = ({state, setAnswers}) => {
  switch (state) {
    case "QUESTION":
      return <RoundStart  />;
    case "GUESSING":
      return <Guessing  />;
    case "MAP_REVEAL":
      return <MapReveal setAnswers={setAnswers} />;
    case "LEADERBOARD":
      return <LeaderBoard  />;
    default:
      return null;
  }
};
GameViewChild.propTypes = {
  state: PropTypes.string.isRequired,
  setAnswers: PropTypes.func.isRequired,
};

const phaseTimeInMillis = (state: string) => {
  if (state === "QUESTION") {
    const questionTime = parseInt(localStorage.getItem("questionTime"), 10);
    if (isNaN(questionTime) || questionTime < 0) {
      return 30000;
    }
    return questionTime * 1000;
  }
  if (state === "GUESSING") {
    const guessingTime = parseInt(localStorage.getItem("guessingTime"), 10);
    if (isNaN(guessingTime) || guessingTime < 0) {
      return 30000;
    }
    return guessingTime * 1000;
  }
  if (state === "MAP_REVEAL") {
    const mapRevealTime = parseInt(localStorage.getItem("mapRevealTime"), 10);
    if (isNaN(mapRevealTime) || mapRevealTime < 0) {
      return 20000;
    }
    return mapRevealTime * 1000;
  }
  if (state === "LEADERBOARD") {
    const leaderboardTime = parseInt(localStorage.getItem("leaderBoardTime"), 10);
    if (isNaN(leaderboardTime) || leaderboardTime < 0) {
      return 20000;
    }
    return leaderboardTime * 1000;
  }
}

const NavigateButtons = ({roundState, setRoundState, goToEndView }) => (
  <div>
    <Button
      style={{ position: "absolute", top: "10px", left: "10px", zIndex: 9 }}
      onClick={() => {
        storeDevGameViewJson("QUESTION");
        setRoundState("QUESTION");
      }}
    >
      RoundStart 
    </Button>
    <Button
      style={{ position: "absolute", top: "40px", left: "10px", zIndex: 9 }}
      onClick={() => {
        storeDevGameViewJson("GUESSING");
        setRoundState("GUESSING");
      }}
    >
      Guessing
    </Button>
    <Button
      style={{ position: "absolute", top: "70px", left: "10px", zIndex: 9 }}
      onClick={() => {
        storeDevGameViewJson("MAP_REVEAL");
        setRoundState("MAP_REVEAL");
      }}
    >
      MapReveal
    </Button>
    <Button
      style={{ position: "absolute", top: "100px", left: "10px", zIndex: 9 }}
      onClick={() => {
        storeDevGameViewJson("LEADERBOARD");
        setRoundState("LEADERBOARD");
      }}
    >
      LeaderBoard
    </Button>
    <Button
      style={{ position: "absolute", top: "160px", left: "10px", zIndex: 9 }}
      onClick={() => {
        storeDevGameViewJson("ENDED");
        goToEndView();
      }}
    >
      Navigate EndView
    </Button>
    <div style ={{ position: "absolute", top: "130px", left: "10px", zIndex: 9, backgroundColor: "orange" }}>
      {roundState ?? "null"}
      {
        // read local storage devGameView pares it to json and read json.roundState
        localStorage.getItem("devGameView")
          ? JSON.parse(localStorage.getItem("devGameView")).roundState
          : "no json"
      }
    </div>
  </div>
);

NavigateButtons.propTypes = {
  setRoundState: PropTypes.func,
  goToEndView: PropTypes.func,
  roundState: PropTypes.string,
};

export default GameView;

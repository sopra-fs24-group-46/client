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


import "styles/views/MapContainer.scss";
import MapBoxComponent from "components/ui/MapBoxComponentMemo";

import RoundStart from "components/game/RoundStart";
import Guessing from "components/game/Guessing";
import MapReveal from "components/game/MapReveal";
import LeaderBoard from "components/game/LeaderBoard";
import BaseContainer from "components/ui/BaseContainer";
import { getGameState, getSettings, getGameView, storeSettings} from "./GameApi";
import {NavigateButtons} from "components/game/DevHelpers"
import ProgressBar from "components/ui/ProgressBar";


const GameView = () => {
  //mapbox
  const [answers, setAnswers] = useState([]);
  const [currentQuestionLocation, setCurrentQuestionLocation] = useState(null);
  const [mapReveal, setMapReveal] = useState(0);

  //internallogic
  const [runFlag, setRunFlag] = useState(false);
  const [everySecondFlag, setEverySecondFlag] = useState(true);
  
  //gamestate
  const [roundState, setRoundState] = useState("QUESTION");
  const [roundStateProgress, setRoundStateProgress] = useState(0); //0 to 100
  
  const gameId = localStorage.getItem("gameId");
  const navigate = useNavigate();

  useEffect(() => {
    //this is executed every 500ms
    const updateGameState = async () => {
      try {
        const gameState = (gameId ?? false) ? await getGameState(): null;
        console.log(gameState);
        //check if gameState is defined
        if (gameState ?? false) {
          setRoundState(gameState.roundState);
          setRoundStateProgress(100 * (gameState.timeTillNextPhaseInMillis / phaseTimeInMillis(gameState.roundState)));
        }


        //check if gamesState is defined before checking gamesState.gameState
        if ((gameState ?? false) && gameState.gameState !== "PLAYING") {
          navigate("../game/ended");
        }
        
      } catch (error) {
        console.log("Error fetching game state:", error);
      }
    }
    
    //this is executed once
    const init = async () => {
      const settings = (gameId ?? false) ? await getSettings() : {questionTime: 1, guessingTime: 2, mapRevealTime: 3, leaderBoardTime: 4};
      storeSettings(settings);
    }

    init();
    const intervalId = setInterval(updateGameState , 500);

    return () => { clearInterval(intervalId); }
  }, []);

  const executeOnNewRound = async () => {
    try {
      const gameView = await getGameView();
      setCurrentQuestionLocation(gameView.currentQuestion.location);
      console.log(gameView.currentQuestion.location);
    } catch (error) {
      console.error("Error fetching game view:", error);
    }
  }

  useEffect (() => {
    //on new round
    if (roundState === "QUESTION") {
      executeOnNewRound();
    }

    //updating map
    if (roundState === "MAP_REVEAL") {
      setMapReveal(1);
    } else{
      setMapReveal(0);
    }

  }, [roundState]);


  return (
    <BaseContainer>
      {
      (localStorage.getItem("playerId") === null || localStorage.getItem("gameId") === null) ?
          (<NavigateButtons
            roundState={roundState}
            setRoundState={setRoundState}
            goToEndView={() => navigate("../game/ended")}
            setTimerProgress={setRoundStateProgress}
          />)
          : null
      }
      
      
      <GameViewChild state={roundState} setAnswers={setAnswers} />
      
      <div className="map container">
        <MapBoxComponent
          roundState={roundState}
          currentQuestionLocation={currentQuestionLocation ?? null}
          reveal={mapReveal ?? 0}
          guessesMapReveal={answers ?? []}
        />
      </div>
      
      <ProgressBar
        progress={roundStateProgress}
        durationInSeconds={phaseTimeInMillis(roundState) / 1000}
        onFinish={() => { }}
      />
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


export default GameView;

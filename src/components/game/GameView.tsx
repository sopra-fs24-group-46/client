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
  const [jokerData, setJokerData] = useState([]);
  const [currentQuestionLocation, setCurrentQuestionLocation] = useState(null);
  const [mapReveal, setMapReveal] = useState(0);

  //gamestate
  const [roundState, setRoundState] = useState("QUESTION");
  const [remainingTimeInMillis, setRemainingTimeInMillis] = useState(2);
  const [restartTimer, setRestartTimer] = useState(false);
  
  const gameId = localStorage.getItem("gameId");
  const navigate = useNavigate();

  useEffect(() => {
    //this is executed every 500ms
    const updateGameState = async () => {
      try {
        const gameState = (gameId ?? false) ? await getGameState(): null;
        //check if gameState is defined
        if (gameState ?? false) {
          //console.log(gameState);
          setRoundState(gameState.roundState);
          setRemainingTimeInMillis(gameState.timeTillNextPhaseInMillis);
        }

        //check if gamesState is defined before checking gamesState.gameState
        if ((gameState ?? false) && gameState.gameState !== "PLAYING") {
          navigate("/game/ended");
        }
        
      } catch (error) {
        console.log("Error fetching game state:", error);
      }
    }
    
    //this is executed once
    const init = async () => {
      const settings = (gameId ?? false) ? await getSettings() : null;
      storeSettings(settings);
      updateGameState(); //load immediately and then every 500ms
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
    console.log("roundState: " + roundState);
    setRestartTimer(true);
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
  
  useEffect (() => {
    //console.log(answers);
  }, [answers]);


  return (
    <BaseContainer>
      {
      (localStorage.getItem("playerId") === null || localStorage.getItem("gameId") === null) ?
          (<NavigateButtons
            roundState={roundState}
            setRoundState={setRoundState}
            goToEndView={() => navigate("/game/ended")}
            setTimerProgress={setRemainingTimeInMillis}
          />)
          : null
      }
      
      
      <GameViewChild state={roundState} setAnswers={setAnswers} setJokerData={setJokerData} />
      
      <div className="map container">
        <MapBoxComponent
          roundState={roundState}
          jokerData={jokerData}
          currentQuestionLocation={currentQuestionLocation ?? null}
          reveal={mapReveal ?? 0}
          guessesMapReveal={answers ?? []}
        />
      </div>
      
      <ProgressBar
        remainingTimeInSeconds={Math.ceil((remainingTimeInMillis / 1000))}
        durationInSeconds={phaseTimeInSeconds(roundState)}
        onFinish={() => { }}
        restartTimer={restartTimer}
        setRestartTimer={setRestartTimer}
      />
    </BaseContainer>
  );
};

//these are the different round states.
const GameViewChild = ({state, setAnswers, setJokerData}) => {
  switch (state) {
    case "QUESTION":
      return <RoundStart  />;
    case "GUESSING":
      return <Guessing  setJokerData={setJokerData}/>;
    case "MAP_REVEAL":
      return <MapReveal setAnswers={setAnswers} />;
    case "LEADERBOARD":
      return <LeaderBoard  />;
    default:
      return <RoundStart  />;
  }
};
GameViewChild.propTypes = {
  state: PropTypes.string.isRequired,
  setAnswers: PropTypes.func.isRequired,
  setJokerData: PropTypes.func.isRequired,
};

const phaseTimeInSeconds = (phase) => {
  switch (phase) {
    case "QUESTION":
      return localStorage.getItem("questionTime") ?? 1;
    case "GUESSING":
      return localStorage.getItem("guessingTime") ?? 2;
    case "MAP_REVEAL":
      return localStorage.getItem("mapRevealTime") ?? 4;
    case "LEADERBOARD":
      return localStorage.getItem("leaderBoardTime") ?? 4;
    default:
      return 0;
  }
}
export default GameView;

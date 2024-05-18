//In the folder game all the components and views for the game are defined
//GameView is the only View of the game.
//In this GameView components for each screen are used and loaded as needed.
//The other files in this folder contain function and components for the game.
//Mentally we can still think of the four views (Question, Guessing, MapReveal, LeaderBoard)
//all view specific code should be in the corresponding files.
//GameView only glues everything together.
//Common components, like a Map, Button and so on should be defined in their own files as well.
//This is done to have one central map component which is only loaded once.

//functions
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getGameState,getSettings, getGameView, submitAnswer} from "./GameApi";
import { useError } from "components/ui/ErrorContext";
import { Storage } from "helpers/LocalStorageManagement";
import { doLeaveGame } from "./Lobby";

//views
import Lobby from "components/game/Lobby";
import RoundStart from "components/game/RoundStart";
import Guessing from "components/game/Guessing";
import MapReveal from "components/game/MapReveal";
import LeaderBoard from "components/game/LeaderBoard";

//components
import BaseContainer from "components/ui/BaseContainer";
import ProgressBar from "components/ui/ProgressBar";
import {NavigateButtons} from "components/game/DevHelpers"
import MapBoxComponent from "components/ui/MapBoxComponentMemo";
import "styles/views/MapContainer.scss";


const GameView = () => {
  //mapbox
  const [answer, setAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [jokerData, setJokerData] = useState([]);
  const [currentQuestionLocation, setCurrentQuestionLocation] = useState(null);
  
  //gamestate
  const [gameState, setGameState] = useState("LOBBY");
  const [roundState, setRoundState] = useState("QUESTION");
  const [remainingTimeInMillis, setRemainingTimeInMillis] = useState(2);
  const [restartTimer, setRestartTimer] = useState(false);
  const [settings, setSettings] = useState({questionTime: 1});
  
  //lobby
  const [players, setPlayers] = useState([]);

  //other
  const {gameId, playerId} = Storage.retrieveGameIdAndPlayerId();
  const navigate = useNavigate();
  const { showError } = useError();
  

  useEffect(() => {
    //this is executed every 500ms
    const updateGameState = async () => {
      try {
        const gameState = (gameId ?? false) ? await getGameState(showError): null;
        //check if gameState is defined
        if (gameState ?? false) {
          console.log(gameState);
          setGameState(gameState.gameState);
          setRoundState(gameState.roundState);
          setRemainingTimeInMillis(gameState.timeTillNextPhaseInMillis);
          
          if (gameState.gameState !== "PLAYING") {
            if (gameState.gameState === "SETUP") {
              navigate("/game/create");
            }
            if (gameState.gameState === "LOBBY") {
              const data = await getGameView(showError);
              setPlayers(data.players);
            }
            if (gameState.gameState === "ENDED") {
              navigate("/game/ended");
            }
            if (gameState.gameState === "CLOSED") {
              doLeaveGame(navigate, showError);
            }
          }
        }
      } catch (error) {
        console.log("Error fetching game state:", error);
      }
    }
    
    //this is executed once
    const init = async () => {
      const settings = (gameId ?? false) ? await getSettings(showError) : null;
      if (settings) setSettings(settings);
      updateGameState(); //load immediately and then every 500ms
    }
    
    init();
    const intervalId = setInterval(updateGameState , 500);

    return () => { clearInterval(intervalId); }
  }, []);
  
  useEffect(() => {
    submitAnswer(answer, showError);
  }, [answer]);

  const executeOnNewRound = async () => {
    try {
      const gameView = await getGameView(showError);
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

  }, [roundState]);

  
  // const MapBoxComponent = React.lazy(() => import("components/ui/MapBoxComponentMemo"));
  

  return (
    <BaseContainer>
      {//dev buttons for testing
      (playerId === null || gameId === null) ?
          (<NavigateButtons
            roundState={roundState}
            setRoundState={setRoundState}
            setGameState={setGameState}
            goToEndView={() => navigate("/game/ended")}
            setTimerProgress={setRemainingTimeInMillis}
          />)
          : null
      }
      
      {/* The different views which are layered over the map. (Lobby, Question, Guessing, MapReveal, LeaderBoard)  */}
      <GameViewChild
        gameState={gameState}
        roundState={roundState}
        players={players}
        setAnswers={setAnswers}
        setJokerData={setJokerData}
      />
      
      <div className="map container">
        <MapBoxComponent
          roundState={roundState}
          jokerData={jokerData}
          currentQuestionLocation={currentQuestionLocation ?? null}
          guessesMapReveal={answers ?? []}
          setAnswer={setAnswer}
        />
      </div>
      
      <ProgressBar
        remainingTimeInSeconds={Math.ceil((remainingTimeInMillis / 1000))}
        durationInSeconds={phaseTimeInSeconds(roundState, settings)}
        onFinish={() => { }}
        restartTimer={restartTimer}
        setRestartTimer={setRestartTimer}
      />
    </BaseContainer>
  );
};

//return appropriate view
const GameViewChild = ({gameState, roundState, players, setAnswers, setJokerData}) => {
  if (gameState === "LOBBY") return <Lobby players={players}/>;
  if (gameState !== "PLAYING") return null;
  switch (roundState) {
    case "QUESTION":
      return <RoundStart  />;
    case "GUESSING":
      return <Guessing  setJokerData={setJokerData}/>;
    case "MAP_REVEAL":
      return <MapReveal setAnswers={setAnswers} />;
    case "LEADERBOARD":
      return <LeaderBoard  />;
    default:
      return <RoundStart />;
  }
};
GameViewChild.propTypes = {
  gameState: PropTypes.string.isRequired,
  roundState: PropTypes.string.isRequired,
  setAnswers: PropTypes.func.isRequired,
  setJokerData: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
};

const phaseTimeInSeconds = (phase, settings) => {
  switch (phase) {
    case "QUESTION":
      return settings.questionTime ?? 1;
    case "GUESSING":
      return settings.guessingTime ?? 2;
    case "MAP_REVEAL":
      return settings.mapRevealTime ?? 4;
    case "LEADERBOARD":
      return settings.leaderBoardTime ?? 4;
    default:
      return 0;
  }
}
export default GameView;

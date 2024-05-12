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
import { getGameState, getSettings, getGameView, storeSettings} from "./GameApi";

const GameView = () => {
  const [gameState, setGameState] = useState("PLAYING");
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
        setRoundStateProgress(100* (gameState.timeTillNextPhaseInMillis / phaseTimeInMillis(gameState.roundState)));
        

        if (gameState.gameState !== "PLAYING") {
          navigate("../game/ended");
        }
      } catch (error) {
        
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
      <NavigateButtons roundState = {roundState} setRoundState={ setRoundState} />
      
      
      <GameViewChild state={roundState} setState={setRoundState} />
      
      <div className="map container">
        <MapBoxComponent
          currentQuestionLocation={null}
          reveal={0}
          guessesMapReveal={[]}
        />
      </div>
    </BaseContainer>
  );
};

//these are the different round states.
const GameViewChild = ({state, setState}) => {
  switch (state) {
    case "QUESTION":
      return <RoundStart setRoundState={setState} />;
    case "GUESSING":
      return <Guessing setRoundState={setState} />;
    case "MAP_REVEAL":
      return <MapReveal setRoundState={setState} />;
    case "LEADERBOARD":
      return <LeaderBoard setRoundState={setState} />;
    default:
      return null;
  }
};
GameViewChild.propTypes = {
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
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

const NavigateButtons = ({roundState, setRoundState }) => (
  <div>
    <Button
      style={{ position: "absolute", top: "10px", left: "10px", zIndex: 1 }}
      onClick={() => {
        setRoundState("QUESTION");
      }}
    >
      RoundStart
    </Button>
    <Button
      style={{ position: "absolute", top: "40px", left: "10px", zIndex: 1 }}
      onClick={() => {
        setRoundState("GUESSING");
      }}
    >
      Guessing
    </Button>
    <Button
      style={{ position: "absolute", top: "70px", left: "10px", zIndex: 1 }}
      onClick={() => {
        setRoundState("MAP_REVEAL");
      }}
    >
      MapReveal
    </Button>
    <Button
      style={{ position: "absolute", top: "100px", left: "10px", zIndex: 1 }}
      onClick={() => {
        setRoundState("LEADERBOARD");
      }}
    >
      LeaderBoard
    </Button>
    <div style ={{ position: "absolute", top: "130px", left: "10px", zIndex: 1, backgroundColor: "orange" }}>
      {roundState ?? "null"}
    </div>
  </div>
);

NavigateButtons.propTypes = {
  setRoundState: PropTypes.func,
  roundState: PropTypes.string,
};

export default GameView;

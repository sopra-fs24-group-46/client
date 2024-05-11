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

import { Button } from "components/ui/Button";

import "styles/views/MapContainer.scss";
import MapBoxComponent from "components/ui/MapBoxComponent";

import RoundStart from "components/game/RoundStart";
import Guessing from "components/game/Guessing";
import MapReveal from "components/game/MapReveal";
import LeaderBoard from "components/game/LeaderBoard";
import BaseContainer from "components/ui/BaseContainer";

const GameView = () => {
  const [roundState, setRoundState] = useState("QUESTION");

  return (
    <BaseContainer>
      <NavigateButtons roundState = {roundState} setRoundState={ setRoundState} />
      {/* <div className="map container">
        <MapBoxComponent
          currentQuestionLocation={null}
          reveal={0}
          guessesMapReveal={[]}
        />
      </div> */}
      {GameViewChild(roundState, setRoundState)}
    </BaseContainer>
  );
};

//these are the different round states.
const GameViewChild = (state: string, setState: any) => {
  if (state === "QUESTION") {
    return <RoundStart setRoundState={setState} />;
  }
  if (state === "GUESSING") {
    return <Guessing setRoundState={setState} />;
  }
  if (state === "MAP_REVEAL") {
    return <MapReveal setRoundState={setState} />;
  }
  if (state === "LEADERBOARD") {
    return <LeaderBoard setRoundState={setState} />;
  }
};

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

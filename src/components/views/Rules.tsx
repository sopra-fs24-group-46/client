import React from "react";
import { Spinner } from "components/ui/Spinner";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import "styles/views/Rules.scss";
import "styles/views/Header.scss";


import { User } from "types";

const Rules = () => {
  const navigate = useNavigate();

  return (
    <BaseContainer>
      <h1 className="header title1">Game Rules!</h1>
      <div className="rules container">
        <p>Welcome to the game! Here is how it works:</p>

        <h2>Number of Players:</h2>
        <p>This game can be played with 2 to 6 players.</p>

        <h2>Power Ups:</h2>
        <p>Power ups are special abilities or advantages that players can obtain during the game to gain an edge over
          their opponents.</p>
      </div>
    </BaseContainer>
  );
};

export default Rules;

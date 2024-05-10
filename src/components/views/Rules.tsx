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

  const handleGoBackClick = () => {
    navigate(`/profile`);
  };

  return (
    <BaseContainer>
      <h1 className="header title1">Game Rules!</h1>
      <div className="rules container">
        <p><strong>Explanation about the game:</strong> Welcome to the game! Here is how it works.</p>

        <p><strong>Number of Players:</strong> This game can be played with 1 to 15 players.</p>

        <p><strong>Number of Rounds:</strong> This game can be played for 1 to 15 rounds.</p>

        <p><strong>Guessing Time:</strong> The rounds can have a guessing time from 1 to 15 seconds, depending on how
          difficult the creator wants the rounds to be.</p>

        <p><strong>Power Ups:</strong> Power ups are special Powers or advantages that players can choose during the
          game to try to win over their opponents. The possible Power ups are Joker, Shield and double the points.</p>

        <button onClick={handleGoBackClick}>Go back</button>

      </div>
    </BaseContainer>
  );
};

export default Rules;

import React from "react";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import "styles/views/Rules.scss";
import "styles/views/Header.scss";

const Rules = () => {
    const navigate = useNavigate();

    const handleGoBackClick = () => {
      navigate(-1)
    };
  return (
    <BaseContainer>
      <div className="rules header-container">
        <h1 className="header title1">Game Rules!</h1>
      </div>
      <div className="rules container">
        <div className="rules content">
          <p className="instruction-title"><strong>Here&apos;s how it works:</strong></p>

          <p><strong>Number of Players:</strong> The game can be played between 1 and 15 players.</p>
          <p><strong>Number of Rounds:</strong> The game can be played for 1 to 10 rounds.</p>
          <p><strong>Guessing Time:</strong> Each round can have a guessing time of 1 to 120 seconds.</p>
          <p><strong>Power Ups:</strong> Power ups add temporary advantage over other players during the game. Players can choose between Joker, Shield, or Double Points during the game to try to win over their opponents.</p>
          <p>The <strong>Joker</strong> shows a red circle where the location could be. The <strong>Double Points</strong> gives the player double the points during that round. The <strong>Shield</strong> gives the average points of all the players during the current round.</p>

        <button onClick={handleGoBackClick}>Go back</button>
      </div>
    </div>
  </BaseContainer>
);
};

export default Rules;

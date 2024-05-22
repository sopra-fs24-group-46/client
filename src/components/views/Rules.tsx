import React from "react";
import { Spinner } from "components/ui/Spinner";
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
    <h1 className="header title1">Game Rules!</h1>
    <div className="rules container">
      <div className="content">
      <p className="instruction-title"><strong>Here is how it works:</strong></p>

        <p> 

        </p>

        <p><strong>Number of Players:</strong> This game can be played between 1 and 15 players.</p>

        <p><strong>Number of Rounds:</strong> This game can be played for 1 to 15 rounds.</p>

        <p><strong>Guessing Time:</strong> Each round can have a guessing time from 2 to 15 seconds.</p>

        <p><strong>Power Ups:</strong> Power ups add temporary advantage over other player during the game. Players can choose between Joker, Shield or Double Points during the
        game to try to win over their opponents.</p>
        <p>The <strong>Joker</strong> shows the region where the location is. 
        The <strong>Double Points</strong> gives the player double the points during that round. The <strong>Shield</strong> gives the average points of all the players during the current round. </p>

        <button className="primary-button" onClick={handleGoBackClick}>Go back</button>
      </div>
    </div>
  </BaseContainer>
);
};

export default Rules;
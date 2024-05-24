import React from "react";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import { LeaderBoardPowerUp } from "components/ui/PowerUp";
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
        <h1 className="header1 rules">Game Rules!</h1>
        <h1 className="header tiny">Game Rules!</h1>
      </div>
      <div className="rules container">

        <p className="instruction-title"><strong>Here&apos;s how it works:</strong></p>
        <div className="rules content">
          

          <p><strong>Number of Players:</strong> The game can be played with up to 5 players.</p>
          <p><strong>Number of Rounds:</strong> Each game consists of multiple rounds where a location name is displayed, and you have to guess its position on the map. You can play up to 10 rounds in one game.</p>
          <p><strong>Guessing Time:</strong> As soon as a location name gets shown to you and the map gets displayed, the guessing stage of the game has started. In this stage each player has to submit a guess by clicking on the map. Guessing time can be set between 2 and 120 seconds.  </p>
          <p><strong>Power Ups:</strong> Power ups add a temporary advantage over other players during the game. Each round, before the map gets shown, every player gets a chance to choose one out of three different power ups. Each power up can only be used once per game and will last for one round.
           Players can choose between the Joker, Double Points or the Shield power up to try to win over their opponents.
          </p>

          <div className="rules powerUp-container">
            <div><LeaderBoardPowerUp powerUp={"JOKER"} /></div>
            <div><LeaderBoardPowerUp powerUp={"X2"} /></div>
            <div><LeaderBoardPowerUp powerUp={"SHIELD"} /></div>
          </div>

          <div>The <strong>Joker</strong> will help you to find the correct location. When used it will mark a region on the map with a red circle. The red circle marks the region in which the correct guess is located.
            The <strong>Double Points</strong> power up is super easy to understand and will just double the points you score in the upcoming round. Be sure to used it when you feel confident. The <strong>Shield</strong> power up helps you when you are unsure about a location.
            Using it will safely give you the average score of all players for the upcoming round.
          </div>

          <div className="rules settings-title" style={{textAlign: "center"}}>
            Settings Info:
          </div>
          <p><strong>Difficulty:</strong> we provide three preselected sets of Mountains and Lakes. You can choose between EASY, MEDIUM and HARD. These cannot be combined with any of the other filtering options.</p>
          <p><strong>Region Filter:</strong> here you can select a Canton or a District of Switzerland. Only Mountains/Lakes in that region will be part of the Question pool. Since our data does not contain all Mountains/Lakes, some Regions might only have a hand full Mountains/Lakes. And the round number must be lowered accordingly.</p>
          <p><strong>Advanced Settings:</strong> here you can combine the Region Filter with the Name Filter and additionally select Hills as a Location Type. The Name Filter will limit the Question Pool to the selected names. This can be used to create custom difficulties. These Settings can be stored and loaded.</p>
      </div>
      <Button onClick={handleGoBackClick} className="edit">Go Back</Button>
    </div>
  </BaseContainer>
);
};

export default Rules;

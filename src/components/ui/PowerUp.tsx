import React from "react";
import PropTypes from "prop-types";
import "../../styles/ui/PowerUp.scss";
import { Button } from "components/ui/Button";
import { usePowerUp } from "helpers/api";

export const PowerUpButton = props => (
  <button disabled = {props.disabled} className={props.inUse ? "powerup button inuse" : "powerup button"} onClick={props.onClick} name="inUse">
    <img src={logoPath(props.powerUp)} alt={logoCaption(props.powerUp)} className="powerup logo"/>
  </button>
);


PowerUpButton.propTypes = {
  inUse: PropTypes.bool,
  disabled: PropTypes.bool,
  powerUp: PropTypes.string,
  onClick: PropTypes.func,
};

export const PowerUp = props => (
  <div className={"powerup icon"}>
    <img src={logoPath(props.powerUp)} alt={logoCaption(props.powerUp)} className="powerup logo"/>
  </div>
);

PowerUp.propTypes = {
  powerUp: PropTypes.string,
};

export const PowerUpBar = props => (
    <div className="powerup container">
        <PowerUpButton
            inUse={props.inUseList.includes("JOKER")}
            disabled={props.disabledList.includes("JOKER") || props.disableAll}
            powerUp="JOKER"
            onClick={() => usePowerUp("JOKER")}
        />
        <PowerUpButton
            inUse={props.inUseList.includes("SHIELD")}
            disabled={props.disabledList.includes("SHIELD") || props.disableAll}
            powerUp="SHIELD"
            onClick={() => usePowerUp("SHIELD")}
        />
        <PowerUpButton
            inUse={props.inUseList.includes("X2")}
            disabled={props.disabledList.includes("X2") || props.disableAll}
            powerUp="X2"
            onClick={() => usePowerUp("X2")}
        />
    </div>
)

PowerUpBar.propTypes = {
    inUseList: PropTypes.array,
    disabledList: PropTypes.array,
    disableAll: PropTypes.bool,
}

export const PowerUpOverlay = props => (
    props.powerUp ?
    <div className="powerup overlay">
        <PowerUp 
        powerUp = {props.powerUp}
        />
    </div> : null
)

PowerUpOverlay.propTypes = {
    powerUp: PropTypes.string,
}

export const LeaderBoardPowerUp = props => (
    props.powerUp ?
    <div className="powerup leaderboard">
        <PowerUp 
        powerUp = {props.powerUp}
        />
    </div> : null
)

LeaderBoardPowerUp.propTypes = {
    powerUp: PropTypes.array,
}


//dont know how to fix the horizontal spacing
export const LeaderBoardPowerUpCollection = props => (
    //iterate over powerUps array
    <div className="powerup lcontainer">
        {props.powerUpList.map((powerUp, index) => (
            <LeaderBoardPowerUp
                key={index} // Add the missing "key" prop
                powerUp = {powerUp}
            />
        ))}
    </div>
)

LeaderBoardPowerUpCollection.propTypes = {
    powerUpList: PropTypes.array,
}
//local helpers

const logoPath = (powerUp) => {
    if (powerUp === "JOKER") {
        return "/J.png";
    }
    if (powerUp === "SHIELD") {
        return "/shield.png";
    }
    if (powerUp === "X2") {
        return "/x2.png";
    }
}

const logoCaption = (powerUp) => {
    if (powerUp === "JOKER") {
        return "Joker";
    }
    if (powerUp === "SHIELD") {
        return "Shield";
    }
    if (powerUp === "X2") {
        return "Times Two";
    }
}
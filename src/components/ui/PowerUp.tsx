import React from "react";
import PropTypes from "prop-types";
import "../../styles/ui/PowerUp.scss";
import { usePowerUp } from "helpers/api";
import { TimesTwoLogo, JokerLogo, ShieldLogo } from "components/ui/Logos";

export const PowerUpButton = (props) => (
  <button
    disabled={props.disabled}
    className={props.inUse ? "powerup button inuse" : "powerup button"}
    onClick={props.onClick}
    name="inUse"
  >
    {logoSvg(props.powerUp)}
  </button>
);

PowerUpButton.propTypes = {
  inUse: PropTypes.bool,
  disabled: PropTypes.bool,
  powerUp: PropTypes.string,
  onClick: PropTypes.func,
};

export const PowerUp = (props) => (
  <div className={"powerup icon"}>{logoSvg(props.powerUp)}</div>
);

PowerUp.propTypes = {
  powerUp: PropTypes.string,
};

export const PowerUpBar = (props) => (
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
);

PowerUpBar.propTypes = {
  inUseList: PropTypes.array,
  disabledList: PropTypes.array,
  disableAll: PropTypes.bool,
};

export const PowerUpOverlay = (props) =>
  props.powerUp ? (
    <div className="powerup overlay">
      <PowerUp powerUp={props.powerUp} />
    </div>
  ) : null;

PowerUpOverlay.propTypes = {
  powerUp: PropTypes.string,
};

export const LeaderBoardPowerUp = (props) =>
  props.powerUp ? (
    <div className="powerup leaderboard">
      <PowerUp powerUp={props.powerUp} />
    </div>
  ) : null;

LeaderBoardPowerUp.propTypes = {
  powerUp: PropTypes.array,
};

export const LeaderBoardPowerUpCollection = (props) => (
  //iterate over powerUps array
  <div className="powerup lcontainer">
    {props.powerUpList.map((powerUp, index) => (
      <LeaderBoardPowerUp
        key={index} // Add the missing "key" prop
        powerUp={powerUp}
      />
    ))}
  </div>
);

LeaderBoardPowerUpCollection.propTypes = {
  powerUpList: PropTypes.array,
};

// // Doesn't work on cloud build
// //local helpers
// const logoPath = (powerUp) => {
//     if (powerUp === "JOKER") {
//         return process.env.PUBLIC_URL + "/J.png";
//     }
//     if (powerUp === "SHIELD") {
//         return process.env.PUBLIC_URL + "/shield.png";
//     }
//     if (powerUp === "X2") {
//         return process.env.PUBLIC_URL + "/x2.png";
//     }
// }

// const logoCaption = (powerUp) => {
//     if (powerUp === "JOKER") {
//         return "Joker";
//     }
//     if (powerUp === "SHIELD") {
//         return "Shield";
//     }
//     if (powerUp === "X2") {
//         return "Times Two";
//     }
// }

const logoSvg = (powerUp) => {
  if (powerUp === "JOKER") {
    return <JokerLogo />;
  }
  if (powerUp === "SHIELD") {
    return <ShieldLogo />;
  }
  if (powerUp === "X2") {
    return <TimesTwoLogo />;
  }
};

// svg's

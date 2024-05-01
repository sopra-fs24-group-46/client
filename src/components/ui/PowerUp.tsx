import React from "react";
import PropTypes from "prop-types";
import "../../styles/ui/PowerUp.scss";
import { Button } from "components/ui/Button";
import { usePowerUp } from "helpers/api";

export const PowerUpButton = props => (
  <button disabled = {props.disabled} className={props.inUse ? "powerup button inuse" : "powerup button"} onClick={props.onClick} name="inUse">
    <img src={props.logo} alt={props.caption} className="powerup logo"/>
  </button>
);

PowerUpButton.propTypes = {
  inUse: PropTypes.bool,
  disabled: PropTypes.bool,
  logo: PropTypes.string,
  caption: PropTypes.string,
  onClick: PropTypes.func,
};

export const PowerUpBar = props => (
    <div className="powerup container">
        <PowerUpButton
            inUse={props.inUseList.includes("JOKER")}
            disabled={props.disabledList.includes("JOKER") || props.disableAll}
            logo="/J.png"
            caption="Joker"
            onClick={() => usePowerUp("JOKER")}
        />
        <PowerUpButton
            inUse={props.inUseList.includes("SHIELD")}
            disabled={props.disabledList.includes("SHIELD") || props.disableAll}
            logo="/shield.png"
            caption="Shield"
            onClick={() => usePowerUp("SHIELD")}
        />
        <PowerUpButton
            inUse={props.inUseList.includes("X2")}
            disabled={props.disabledList.includes("X2") || props.disableAll}
            logo="/x2.png"
            caption="Times Two"
            onClick={() => usePowerUp("X2")}
        />
    </div>
)

PowerUpBar.propTypes = {
    inUseList: PropTypes.array,
    disabledList: PropTypes.array,
    disableAll: PropTypes.bool,
}
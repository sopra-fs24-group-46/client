import React from "react";
import { Button } from "./Button";
import { Storage } from "helpers/LocalStorageManagement";

import "styles/views/Header.scss";
import "styles/views/Authentication.scss";

interface Props {
  message: string;
  onClose?: () => void;
  onYes?: () => void;
  onNo?: () => void;
}

const RedirectToGame = () => {
  const [show, setShow] = React.useState(true);
  const leave = () => {
    Storage.removeGameIdAndPlayerId();
    setShow(false);
  }
  
  const goBackToGame = () => {
    //navigate to game
    window.location.href = "/game/welcome_back";
    setShow(false);
  }
    

  const overlay = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999999999999999999999999,
      }}
    >
      <div className="authentication container">
        <div className="authentication form" style={{ textAlign: "center", color : "white"}}>
          <h2>It looks like you are already in a game.</h2>
          <p>Do you want to go back to the game or leave the game?</p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Button
              onClick={leave}
            >
              leave game
            </Button>
            <span style={{display: "inline-block", width: "20px"}}></span>
            <Button
              onClick={goBackToGame}
            >
              back to game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
  
  return show ? overlay : null;
};

export default RedirectToGame;

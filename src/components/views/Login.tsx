import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = (props) => {
  return (
    <div className="login field">
      <label className="login label">{props.label}</label>
      <input
        className="login input"
        placeholder="enter here.."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const Login = () => {
  const navigate = useNavigate();
  const [gamePin, setGamePin] = useState(""); // State for the game pin

  const doLogin = async () => {
    try {
      if (!gamePin) {
        // Check if game pin is not entered
        alert("Please enter the Game Pin.");
        return;
      }

      // Example of API call (replace it with your actual API call)
      // const response = await api.post("/join-game", { gamePin });

      // Placeholder for handling API response
      // Replace it with your actual logic to navigate to the game page
      console.log("Joining game with pin:", gamePin);

      // Dummy navigation to the game page
      navigate("/game");
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  const handleRegisterClick = () => {
    // Redirect to the registration page when clicked
    navigate("/register");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <div className="login field" style={{ textAlign: "center" }}>
            <input
              className="login input"
              type="text"
              placeholder="Enter Game Pin"
              value={gamePin}
              onChange={(e) => setGamePin(e.target.value)}
              style={{ textAlign: "center" }} // Center the input text
            />
          </div>
          
          <div className="login button-container">
            <Button
              width="100%"
              onClick={doLogin}
            >
              Join Game
            </Button>
          </div>
          <div className="login link-container" style={{ marginTop: "1em", display: "flex", justifyContent: "space-between" }}>
            <div className="login register-link" onClick={handleRegisterClick}>
              Register here.
            </div>
            <div className="login login-link" onClick={handleLoginClick}>
              Login
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Login;
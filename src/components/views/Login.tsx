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
        type={props.type} // Set the input type dynamically
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
  type: PropTypes.string, 
  onChange: PropTypes.func,
};

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      const response = await api.post("/login", requestBody); 
  
      // Log the response data to inspect its structure
      const userData = response.data;
      localStorage.setItem("token", userData.token);
      localStorage.setItem("id", userData.user.id);
  
      // Check if the token is present in the response data
      if (response.data && response.data.token) {
        // Store the token into the local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.user.id);
  
        // Navigate to the game page
        navigate("/profile");
      } else {
        // Handle the case where the token is not present in the response
        alert("Token not found in the response");
      }
    } catch (error) {
      alert(
        `Something went wrong during the login: \n${handleError(error)}`
      );
    }
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <FormField
            label="Username"
            value={username}
            onChange={(un: string) => setUsername(un)}
          />
          <FormField
            label="Password"
            type="password" 
            value={password}
            onChange={(n) => setPassword(n)}
          />
          <div className="login button-container">
          <Button
              disabled={!username || !password}
              width="100%"
              onClick={() => doLogin()}
            >
              Login
            </Button>
            <Button /* button to create new user*/
              width="100%"
              onClick={() => navigate(`/home`)}
            >
                Go back
              </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default Login;

import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import FormField from "components/ui/FormField"
/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const Register = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [passwordRep, setPasswordRep] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const doRegister = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      const response = await api.post("/users", requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem("token", user.token);
      sessionStorage.setItem("token", user.token);

      // Register successfully worked --> navigate to the route /game in the GameRouter
      navigate("/game");
    } catch (error) {
      alert(
        `Something went wrong during the Register: \n${handleError(error)}`
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
            name="password"
            type="password"
            value={password}
            onChange={(n) => setPassword(n)}
            />
                  <FormField
            label="Password"
            name="repeat password"
            type="password"
            value={passwordRep}
            onChange={(n) => setPasswordRep(n)}
          />
          <div className="login button-container">
            <Button
              disabled={!username || !password || password !== passwordRep}
              width="100%"
              onClick={() => doRegister()}
            >
              Register
            </Button>
            <Button
              width="100%"
              onClick={() => navigate("/login")}
            >
              Go to Login
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
export default Register;

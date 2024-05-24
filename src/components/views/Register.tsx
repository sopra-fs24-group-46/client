import React, { useState } from "react";
import { api, shortError} from "helpers/api";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import { useError } from "components/ui/ErrorContext";
import { Storage } from "helpers/LocalStorageManagement";
import {FormField} from "components/ui/FormFieldString";

//styling
import "styles/views/Header.scss";
import "styles/views/Authentication.scss";

const SignUp = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [password, setPassword] = useState<string>(null);
  const [username, setUsername] = useState<string>(null);

  const doSignup = async () => {
    
    try {
      const requestBody = JSON.stringify({ username, password });
      const response = await api.post("/users", requestBody);

      // Store the token from the response headers into local storage
      const token = response.data.token;
      const id = response.data.id;

      Storage.storeUser(id, token);

      // Navigate to the desired route
      navigate("/profile");
      } catch (error) {
        showError('Something went wrong during the sign up: ' + shortError(error));
      }
  };

  const inputIsValid = () => {
    return password.length >= 6;
  };

  return (
    <BaseContainer>
      <h1 className="header authentication">Gwüsst</h1>
      <div className="authentication container">
        <div className="authentication form">
          <FormField
            className="authentication"
            label="Username:"
            type="text"
            value={username || ""}
            placeholder={"enter here..."}
            onChange={(un) => setUsername(un)}
          />
          <FormField
            className="authentication"
            label="Password:"
            type="password"
            value={password || ""}
            placeholder={"enter here..."}
            onChange={(n) => setPassword(n)}
          />
          <div className="authentication password-hint">
            password length {password ? `${password.length}/6` : '0/6'}
          </div>
          <div className="authentication button-container">
            <Button
              disabled={!username || !password || !inputIsValid()}
              width="100%"
              className={"authentication"}
              onClick={() => doSignup()}>
              Sign Up
            </Button>
            <Button
              width="100%"
              className={"authentication"}
              onClick={() => navigate(`/home`)}>
              Go back
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default SignUp;
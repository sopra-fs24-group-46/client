import React, { useState } from "react";
import { api, shortError} from "helpers/api";
import User from "models/User";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import Header from "components/views/Header";
import PropTypes from "prop-types";
import { useError } from "components/ui/ErrorContext";
import { Storage } from "helpers/LocalStorageManagement";
import {FormField} from "components/ui/FormFieldString";

//styling
import "styles/views/Header.scss";
import "styles/views/Authentication.scss";

const SignUp = (props) => {
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
                password lenght {password ? `${password.length}/6` : '0/6'}
              </div>
                  <div className="login button-container" style={{ marginTop: '10px' }}>
                  <Button
                      disabled={!username || !password}
                      width="100%"
                      onClick={() => {
                          // Check if the password length is greater than 6
                          if (password.length > 5) {
                              doSignup();
                          } else {
                              showError("Password should be longer than 6 characters.");
                          }
                      }}
                  >
                      Sign Up
                  </Button>
                  <Button
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

export default SignUp;
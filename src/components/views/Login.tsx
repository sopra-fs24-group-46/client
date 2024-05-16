import React, { useState } from "react";
import { api, shortError} from "helpers/api";
import {useNavigate} from "react-router-dom";
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



const Login = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const doLogin = async () => {

    try {
      const requestBody = JSON.stringify({ username, password });
      const response = await api.post("/login", requestBody); 
  
      // Log the response data to inspect its structure
      const user = response.data.user;
      Storage.storeUser(user.id, user.token);
      navigate("/profile");
    } catch (error) {
      showError(
        shortError(error)
      );
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
            type="string"
            value={username}
            placeholder={"enter here..."}
            onChange={(un: string) => setUsername(un)}
          />
          <FormField
            className="authentication"
            label="Password:"
            type="password" 
            value={password}
            placeholder={"enter here..."}
            onChange={(n) => setPassword(n)}
          />
          <div className="authentication button-container">
            <Button
              className="authentication"
              disabled={!username || !password}
              width="100%"
              onClick={() => doLogin()}>
              Login
            </Button>
            <Button
              className="authentication"
              width="100%"
              onClick={() => navigate(`/home`)}>
              Go back
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Login;

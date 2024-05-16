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
      <Header/>
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

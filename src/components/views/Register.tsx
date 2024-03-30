import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from 'components/ui/BaseContainer';
import PropTypes from "prop-types";


const FormField = props => {
   return (
     <div className="login field">
       <label className="login label">{props.label}</label>
        <input
            type={props.type}
            className="login input"
            placeholder="enter here..."
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
        />
        </div>
    );
};

FormField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  };

const SignUp = props => {
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>(null);
    const [username, setUsername] = useState<string>(null);

    const doSignup = async () => {
      try {
          const requestBody = JSON.stringify({ username, password });
          const response = await api.post('/users', requestBody);
  
          // Store the token from the response headers into local storage
          const token = response.data.token;
          localStorage.setItem('token', token);
  
          // Check if the response contains user data
          if (response.data.user) {
            // Get the returned user data from the response body
            const user = response.data.user;

            // Store the user ID into local storage
            localStorage.setItem('id', user.id);
          }
  
          // Navigate to the desired route
          navigate("/users");
      } catch (error) {
      alert(`Something went wrong during the sign up: \n${handleError(error)}`);
      window.location.reload();      }
  };
  

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <FormField
            label="Username"
            value={username || ''}
            onChange={(un) => setUsername(un)}
          />
          <FormField
            label="Password"
            type="password"
            value={password || ''}
            onChange={(n) => setPassword(n)}
          />
          <div className="login button-container">
            <Button
              disabled={!username || !password}
              width="100%"
              onClick={() => doSignup()}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default SignUp;

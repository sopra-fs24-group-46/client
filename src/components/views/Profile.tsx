import React, { useState, useEffect } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import {useNavigate, useLocation} from "react-router-dom";
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
const ProfileField = (props) => {
  return (
    <div className="login field">
      <label className="login label">{props.label}</label>
      <input
        className="login input"
        placeholder={props.label}
        value={props.value}
        type = {props.type ? props.type : "text"}
        onChange={(e) => props.onChange(e.target.value)}
        disabled={props.disabled ? props.disabled: false}
      />
    </div>
  );
};

ProfileField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.date,
  type: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.boolean,
};

const Profile = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const navigate = useNavigate();
  const [name, setName] = useState<string>(null);
  const [birthday, setBirthday] = useState<string>(null);
  const [username, setUsername] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const [creation_date, setCreationDate] = useState<string>(null);
  const [is_owner, setIsOwner] = useState<string>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/users/" + id);
        // Get the returned user and update a new object.
        const user = new User(response.data);
        setName(user.name);
        setBirthday(user.birthday ? (new Date(user.birthday)).toISOString().split('T')[0]: null);
        setUsername(user.username);
        setCreationDate((new Date(user.creation_date)).toISOString().split('T')[0]);
        console.log(user.name);
        console.log(user.username);
        console.log(new Date(user.birthday));
        
        let localToken = sessionStorage.getItem("token");
        if (localToken === user.token) {
          setIsOwner(true);
        }


      } catch (error) {
        alert(
          `Something went wrong. User Data can't be loaded: \n${handleError(error)}`
        );
      }
    };
    fetchData();
  }, []);

  const backToDashboard = (): void => {
    navigate("/game");
  };

  const updateProfile = async () => {
    try {
      const requestBody = JSON.stringify({ username, name, birthday, password });
      const response = await api.put("/users/"+id, requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

    } catch (error) {
      alert(
        `Something went wrong. Changes can't be saved: \n${handleError(error)}`
      );
    }
  };

  return (
    <BaseContainer>
      <h1>Profile of user: {id}</h1>
      <div className="login container">
        <div className="login form">
          <ProfileField
            label="Username"
            value={username}
            disabled={!is_owner}
            onChange={(un: string) => setUsername(un)}
          />
        <ProfileField
            label="Name"
            value={name}
            disabled={!is_owner}
            onChange={(n) => setName(n)}
        />
        <ProfileField
            label="Birthday"
            type="Date"
            value={birthday}
            disabled={!is_owner}
            onChange={(n) => setBirthday(n)}
        />
        <ProfileField
            label="Creation date"
            type="Date"
            value={creation_date}
            disabled={true}
            onChange={(n) => setCreationDate(n)}
        />
        <ProfileField
            type="password"
            label="Password"
            value={password}
            disabled={!is_owner}
            onChange={(n) => setPassword(n)}
        />

          <div className="login button-container">
            <Button
              width="100%"
              disabled={!is_owner}
              onClick={() => updateProfile()}
            >
              Save changes
            </Button>
            <Button width="100%" onClick={() => backToDashboard()}>
              Dashboard
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
export default Profile;

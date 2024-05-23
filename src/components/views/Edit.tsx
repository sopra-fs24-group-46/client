import React, { useState, useEffect } from "react";
import { api, handleError, getUser } from "helpers/api";
import { useNavigate, useParams } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { Button } from "components/ui/Button";
import "styles/views/EditProfile.scss";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import User from "models/User";
import { useError } from "components/ui/ErrorContext";
import { Storage } from "helpers/LocalStorageManagement";
import { FormFieldEdit } from "../ui/FormFieldString";

const Edit = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [initialUsername, setInitialUsername] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>(''); // new for password
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // new for password confirmation

  useEffect(() => {
    async function fetchData() {
      try {
        // Retrieve the user ID from localStorage
        const { id, token } = Storage.retrieveUser();
        const user = await getUser(id, token, showError);

        setUser(user);
        setUsername(user.username);
        setInitialUsername(user.username);
        console.log("Fetched User:", user);
      } catch (error) {
        console.error(`Something went wrong while fetching the user: \n${handleError(error)}`);
        alert("Something went wrong while fetching the user! See the console for details.");
      }
    }
    fetchData();
  }, [id, showError]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const changeUsername = async () => {
    try {

      const { id: storedUserId, token } = Storage.retrieveUser();
      if (!storedUserId) {
        throw new Error('User ID not found in localStorage');
      }

      const user = { id: storedUserId, username, password: null }; // Include user ID in the request body
      const credentials = { id: storedUserId, token: token };
      const requestBody = { user: user, credentialsDTO: credentials };
      await api.put(`/users/${storedUserId}`, requestBody);
      // Send PUT request to the correct endpoint with the updated username and user ID
      alert("Changes saved successfully!");
      window.location.reload();
    } catch (error) {
      console.error(
          `Something went wrong while saving the changes: \n${handleError(error)}`
      );
      alert(
          "Something went wrong while saving the changes! See the console for details."
      );
      window.location.reload();
    }
  };


  const changePassword = async () => {

    try {

      const { id: storedUserId, token } = Storage.retrieveUser();
      if (!storedUserId) {
        throw new Error('User ID not found in localStorage');
      }

      const user = { id: storedUserId, username: null, password }; // Include user ID in the request body
      const credentials = { id: storedUserId, token: token };
      const requestBody = { user: user, credentialsDTO: credentials };
      await api.put(`/users/${storedUserId}`, requestBody);
      // Send PUT request to the correct endpoint with the updated username and user ID
      alert("Changes saved successfully!");
      window.location.reload();
    } catch (error) {
      console.error(
          `Something went wrong while saving the changes: \n${handleError(error)}`
      );
      alert(
          "Something went wrong while saving the changes! See the console for details."
      );
      window.location.reload();
    }
  };

  const newUsernameIsValid = (currentUsername) => {

    return currentUsername === initialUsername || currentUsername === '';

  }

  const newPasswordIsValid = (password, confirmPassword) => {

    return password === '' || password !== confirmPassword || password.length < 6;

  }

  const handleGoBackClick = () => {
    setUsername(initialUsername);
    setPassword('');
    setConfirmPassword('');
    navigate(`/profile`);
  };

  return (
    <BaseContainer >
      <div className="profile container">
        <div className="profile button-container">
          <div className="edit formfield-title">Change username:</div>
          <FormFieldEdit
              className="authentication"
              label="Username"
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter Username"
          />
          <Button onClick={changeUsername} className="edit" disabled={newUsernameIsValid(username)} style={{width: "100%"}}>
            Save new username
          </Button>

          <div className="edit formfield-title">Change password:</div>
          <FormFieldEdit
              className="authentication"
              label="new Password"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="new password"
          />
          <FormFieldEdit
              className="authentication"
              label="confirm new password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="new password"
          />

          <Button onClick={changePassword} className="edit" disabled={newPasswordIsValid(password, confirmPassword)} style={{width: "100%"}}>
            Save new password
          </Button>
          <Button onClick={handleGoBackClick} className="edit" style={{width: "100%"}}>
            Go Back
          </Button>
        </div>

      </div>
    </BaseContainer>
  );
};

Edit.propTypes = {
  user: PropTypes.object,
};

export default Edit;

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
  const [passwordError, setPasswordError] = useState<string>('');
  const [hasChanges, setHasChanges] = useState<boolean>(false);

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
    setHasChanges(true);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setHasChanges(true);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    setHasChanges(true);
  };

  const doEdit = async () => {
    try {
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }

      const { id: storedUserId, token } = Storage.retrieveUser();
      if (!storedUserId) {
        throw new Error('User ID not found in localStorage');
      }

      const user = { id: storedUserId, username, password }; // Include user ID in the request body
      const credentials = { id: storedUserId, token: token };
      const requestBody = { user: user, credentialsDTO: credentials };
      await api.put(`/users/${storedUserId}`, requestBody);
      // Send PUT request to the correct endpoint with the updated username and user ID
      alert("Changes saved successfully!");
      navigate(`/profile`);
    } catch (error) {
      console.error(
          `Something went wrong while saving the changes: \n${handleError(error)}`
      );
      alert(
          "Something went wrong while saving the changes! See the console for details."
      );
    }
  };

  const handleGoBackClick = () => {
    setUsername(initialUsername);
    setPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setHasChanges(false);
    navigate(`/profile`);
  };

  return (
      <BaseContainer className="edit-profile container">
        <form className="profile-edit form">
          <FormFieldEdit
              className="edit"
              label="Username"
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter Username"
          />
          <p>Please confirm the change with your password</p> 
          <FormFieldEdit
              className="edit"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter Password"
          />
          <FormFieldEdit
              className="edit"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm Password"
          />
          {passwordError && (
              <p className="error-message">
                {passwordError} <i className="fa fa-exclamation-circle"></i>
              </p>
          )}
          <Button onClick={doEdit} className="edit" disabled={!hasChanges}>
            Save
          </Button>
          <Button onClick={handleGoBackClick} className="edit">
            Go Back
          </Button>
        </form>

        <ToastContainer />
      </BaseContainer>
  );
};

Edit.propTypes = {
  user: PropTypes.object,
};

export default Edit;

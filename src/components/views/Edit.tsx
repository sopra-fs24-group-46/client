import React, { useState, useEffect } from "react";
import { api, handleError, getUser} from "helpers/api";
import { useNavigate, useParams } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import User from "models/User";
import { useError } from "components/ui/ErrorContext";
import { Storage } from "helpers/LocalStorageManagement";

const Edit = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [initialUsername, setInitialUsername] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>(''); // new for password
  const [confirmPassword, setConfirmPassword] = useState<string>(''); //new for password confirmation
  const [passwordError, setPasswordError] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        // Retrieve the user ID from localStorage
  
        const {id, token} = Storage.retrieveUser();
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
  }, [id]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const doEdit = async () => {
    try {
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }

      const {id: storedUserId, token} = Storage.retrieveUser();
      if (!storedUserId) {
        throw new Error('User ID not found in localStorage');
      }
  
      const user = { id: storedUserId, username, password }; // Include user ID in the request body
      const credentials = { id: storedUserId, token: token };
      const requestBody = { user: user, credentialsDTO: credentials };
      await api.put(`/users/${storedUserId}`, requestBody); // Send PUT request to the correct endpoint with the updated username and user ID
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
    navigate(`/profile`);
  };

  return (
    <BaseContainer className="edit-profile container">
      <h1>Edit my Profile</h1>

      <p>Username: <input type="text" value={username} onChange={handleUsernameChange} /></p>
      <p>Password: <input type="password" value={password} onChange={handlePasswordChange} /></p>  {/* Password input field */}
      <p>Confirm Password: <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} /></p>
      {passwordError && <p style ={{color: 'red'}}>{passwordError}</p>}
      <button onClick={doEdit}>Save</button> {/* Use doEdit instead of handleSaveButtonClick */}
      <button onClick={handleGoBackClick}>Go back</button>
      {/*<button onClick={() => navigate(`/users/${id}`)}>Go back</button>*/}
    </BaseContainer>
  );
};

Edit.propTypes = {
  user: PropTypes.object,
};

// FormField component definition goes here

export default Edit;
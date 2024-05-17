import React, { useEffect, useState } from "react";
import { api, handleError, shortError, getUser} from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import "styles/views/Profile.scss";
import "styles/views/Header.scss";
import { User } from "types";
import { joinGame } from "components/game/GameApi";
import { useError } from "components/ui/ErrorContext";
import { Storage } from "helpers/LocalStorageManagement";
import { FormField } from "components/ui/FormFieldString";


const Player = ({ user }: { user: User }) => (
    <div className="player container">
      <div className="player username">{user.username}</div>
      <div className="player name">{user.name}</div>
      <div className="player id">id: {user.id}</div>
    </div>
);


Player.propTypes = {
  user: PropTypes.object,
};


const Profile = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [loggedInUser, setLoggedInUser] = useState<User>(null);
  const [gameId, setGameId] = useState<string>('');


  const logout = (): void => {
    Storage.removeUser();
    navigate("/home");
  };


  const createCustomGame = async () => {
    try {
      const {id, token} = Storage.retrieveUser();


      if (!token || !id) {
        throw new Error("Token or user id not found in localStorage");
      }


      const response = await api.post("/game/create", {
        id: id,
        token: token,
      });

      // Extract gameId from the response
      const { gameId } = response.data;
      const { playerId } = response.data;


      // Save gameId to localStorage
      Storage.storeGameIdAndPlayerId(gameId, playerId);


      console.log('Game creation');


      navigate('/game/create');
    } catch (error) {
      console.error("Error creating custom game:", error);
    }
  };


  //TODO dont let user join if game is full
  const joinGameHandler = async () => {
    try {
      if (!gameId) {
        throw new Error("No Game Pin provided!");
      }
      await joinGame(gameId, loggedInUser.username, showError)
      navigate("/game/lobby/" + gameId);
    } catch (error) {
      if (error.message === "No Game Pin provided!") {
        console.error("No Game Pin provided!");
        showError("No Game Pin provided!");
      }
    }
  };
  
  

  const editPassword = () => {
    navigate("edit");
  }
  const editUsername = () => {
    // Redirect to /game/create endpoint
    navigate("edit");
  };


  const rules = () => {
    navigate("/rules");
  };


  useEffect(() => {
    async function fetchData() {
      const {id, token} = Storage.retrieveUser();
      const user = await getUser(id, token, console.log);

      if (!user) {//invalid token and or id
        Storage.removeUser();
        navigate("/home");
      }

      console.log("Fetched User:", user);
      setLoggedInUser(user);
    }


    fetchData();
  }, []);


  let content = <Spinner />;


  if (loggedInUser && loggedInUser.username) {
    content = (
      <div className="profile button-container">
        <Button width="100%" onClick={() => logout()}>
          Logout
        </Button>
        <Button width="100%" onClick={() => createCustomGame()}>
          Create custom game
        </Button>
        <Button width="100%" onClick={() => editUsername()}>
          Edit Username or password
        </Button>
        <Button width="100%" onClick={() => rules()}>
          Game Rules
        </Button>
        <Button width="100%" onClick={() => joinGameHandler()}>
          Join Game
        </Button>
        <FormField
          className="profile"
          type="text"
          placeholder="Enter game pin to join a game..."
          value={gameId}
          onChange={(un: string) => setGameId(un)}
        />
      </div>
    );
  }

  return (
    <BaseContainer>
      <div className="profile header-container">
        <h1 className="header1 profile">WELCOME, {loggedInUser && loggedInUser.username}!</h1>
      </div>
      <div className="profile container">
        {content}
      </div>
    </BaseContainer>
  );
};

export default Profile;
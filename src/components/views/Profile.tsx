import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { User } from "types";

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
  const [loggedInUser, setLoggedInUser] = useState<User>(null);

  const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/home");
  };

  const createCustomGame = () => {
    // Redirect to /game/create endpoint
    navigate("/game/create");
  };

  const editPassword = () => {
    navigate("/edit");
  }
  const editUsername = () => {
    // Redirect to /game/create endpoint
    navigate("/edit");
  };


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/users`);
        const users = response.data;
        const userId = localStorage.getItem('id');
        const user = users.find((user) => user.id === parseInt(userId));
        if (!user) {
          throw new Error('User not found');
        }
        setLoggedInUser(user);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the user: \n${handleError(error)}`
        );
        console.error('Details:', error);
        alert('Something went wrong while fetching the user! See the console for details.');
      }
    }

    fetchData();
  }, []);

  let content = <Spinner />;

  if (loggedInUser && loggedInUser.username) {
    content = (
      <div className="game">
        <Button width="100%" onClick={() => logout()}>
          Logout
        </Button>
        <Button width="100%" onClick={() => createCustomGame()}>
          Create custom game
        </Button>
        <Button width="100%" onClick={() => editUsername()}>
        Edit Username or password
        </Button>
      </div>
    );
  }

  return (
    <BaseContainer className="game container">
      <h2>Welcome, {loggedInUser && loggedInUser.username}!</h2>
      {content}
    </BaseContainer>
  );
};

export default Profile;

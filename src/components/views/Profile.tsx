import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import "styles/views/Profile.scss";
import "styles/views/Header.scss";


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

  const createCustomGame = async () => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");

      if (!token || !id) {
        throw new Error("Token or user id not found in localStorage");
      }

      await api.post("/game/create", {
        id: id,
        token: token,
      });

      navigate("game/create");
    } catch (error) {
      console.error("Error creating custom game:", error);
    }
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
      </div>
    );
  }

  return (
    <BaseContainer>
      <h1 className="header title1">Welcome, {loggedInUser && loggedInUser.username}!</h1>
      <div className="profile container">
      {content}
      </div>
    </BaseContainer>
  );
};

export default Profile;

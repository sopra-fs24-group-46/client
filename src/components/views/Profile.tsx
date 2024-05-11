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


const FormField = (props) => {
  return (
      <div className="profile field">
        <label className="profile label">{props.label}</label>
        <input
            type={props.type}
            className="profile input"
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
        />
      </div>
  );
};


FormField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};


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
  const [gameId, setGameId] = useState<string>('');


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


      const response = await api.post("/game/create", {
        id: id,
        token: token,
      });

      // Extract gameId from the response
      const { gameId } = response.data;
      const { playerId } = response.data;


      // Save gameId to localStorage
      localStorage.setItem("gameId", gameId);
      localStorage.setItem("playerId", playerId);


      console.log('Game creation');


      navigate('/game/create');
    } catch (error) {
      console.error("Error creating custom game:", error);
    }
  };


  //TODO dont let user join if game is full
  const joinGame = async () => {
    try {
      const token = localStorage.getItem("token");
      // const gameId = gameId;
      // const gameId = localStorage.getItem("gameId");

      if (!token || !gameId) {
        alert(
            "No Game Pin provided!"
        );
      } else {

        // Construct the request body
        const requestBody = {
          displayName: loggedInUser.username,

        };

        const response = await api.post(`/game/${gameId}/join`, requestBody);
        console.log(response.data);

        localStorage.setItem("gameId", gameId);
        localStorage.setItem("playerId", response.data);


        console.log('Joining game response:', response.data);
        navigate(`/lobby/${gameId}`);
      }
      // if (!token || !gameId) {
      //   throw new Error("Token or game id not found");
      // }


      // const response = await api.post(`/game/${gameId}/join`, {
      //   displayName: loggedInUser.username, // Send username as displayName
      //   gameId: gameId,
      // }, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // navigate(`/lobby/${gameId}`);
      // console.log('Joining game response:', response.data);
    } catch (error) {
      console.log('Error response data:', error.response.data); // Log error response data


      console.log('Error response data:', error.response.data);
      // Log error response data


      console.error("Error joining game:", error);
      alert(
          "Game not found!"
      );
    }
  };


  const editPassword = () => {
    navigate("/edit");
  }
  const editUsername = () => {
    // Redirect to /game/create endpoint
    navigate("/edit");
  };


  const rules = () => {
    navigate("/rules");
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
          <Button width="100%" onClick={() => rules()}>
            Game Rules
          </Button>
          <Button width="100%" onClick={() => joinGame()}>
            Join Game
          </Button>
          <FormField
              label="Enter Game Pin"
              placeholder="Enter game pin here..."
              value={gameId}
              onChange={(gameId) => setGameId(gameId)}
          />
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
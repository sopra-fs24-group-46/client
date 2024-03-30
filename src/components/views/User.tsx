import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { useParams, useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const loggedInUserToken = localStorage.getItem("token");

  useEffect(() => {
    if (!loggedInUserToken) {
      navigate("/home");
      
      return;
    }

    async function fetchData() {
      try {
        const response = await api.get(`/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error(`Error fetching user data: ${handleError(error)}`);
      }
    }
    fetchData();
  }, [id, loggedInUserToken, navigate]);

  useEffect(() => {
    async function fetchUserToken() {
      try {
        const response = await api.get("/users/tokens");
        const userTokens = response.data;
        const token = userTokens.find(tokenObj => tokenObj.id === parseInt(id)); // Convert id to appropriate format
        if (token) {
          setUserToken(token.token);
        }
      } catch (error) {
        console.error(`Error fetching user token: ${handleError(error)}`);
      }
    }
    fetchUserToken();
  }, [id]);
  

  useEffect(() => {
    console.log("loggedInUserToken:", loggedInUserToken);
    console.log("userToken:", userToken);
  }, [loggedInUserToken, userToken]);

  const handleEditButtonClick = () => {
    navigate(`/users/${id}/edit`); 
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh" }}>
      <div>
        {user ? (
          <>
            <h1>{user.username}&apos;s Profile</h1>
            <p>Username: {user.username}</p>
            <p>Online Status: {user.status}</p>
            <p>Creation Date: {user.creationDate}</p>
            <p>Birth Date: {user.birthDate}</p>
            {/* Show edit button only if the logged-in user's token matches the token of the user being displayed */}
            {loggedInUserToken === userToken && <button onClick={handleEditButtonClick}>Edit</button>}
          </>
        ) : (
          <div>Loading...</div>
        )}
        <button onClick={() => navigate("/game/")}>Back to Player&apos;s Overview</button>
      </div>
    </div>
  );
};

export default User;

import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import { HomeGuard } from "../routeProtectors/HomeGuard"; 
import { RegisterGuard } from "../routeProtectors/RegisterGuard"; 
import Home from "../../views/Home";
import Login from "../../views/Login";
import Register from "../../views/Register";
import MapEndpoint from "../../views/MapEndpoint";
import Profile from "../../views/Profile";
import SetGame from "../../views/SetGame";
import Edit from "../../views/Edit";
import Lobby from "../../views/Lobby";
import RoundStart from "../../views/RoundStart";
import Question from "../../views/Question";
import MapReveal from "../../views/MapReveal";
import Leaderboard from "../../views/Leaderboard";
import Rules from "../../views/Rules";
import ComponentDev from "../../views/ComponentDev";










/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reactrouter.com/en/main/start/tutorial
 */
const AppRouter = () => {
  localStorage.setItem("playerId", "true");
  return (
      <BrowserRouter>

        <Routes>

          <Route path="/game" element={<GameGuard />}>
            <Route path="*" element={<GameRouter />}/>
          </Route>

          <Route path="/login/*" element={<LoginGuard />}>
            <Route path="/login/*" element={<Login />} />
          </Route>

          <Route path="/register" element={<Register />} />

        <Route path="/home" element={<HomeGuard />}>
          <Route path="" element={<Home />} />
        </Route>

        <Route path="/register" element={<RegisterGuard />}>
          <Route path="" element={<Register />} />
        </Route>


          <Route path="/question" element={<MapEndpoint />} />

          <Route path="/ComponentDev" element={<ComponentDev />} />

          <Route path="/profile" element={<Profile/>} />

          <Route path="/rules" element={<Rules/>} />

          <Route path="/edit" element={<Edit/>} />

          <Route path="/game/create" element={<SetGame/>} />

          <Route path="/lobby/:gameId" element={<Lobby/>} />

          {/*this should be moved into game router*/}
          <Route path="/game/:gameId/round/:currentRound" element={<RoundStart/>} />

          <Route path="/game/:gameId/round/:currentRound/guessing" element={<Question />} />

          <Route path="/game/:gameId/round/:currentRound/mapReveal" element={<MapReveal />} />

          <Route path="/game/:gameId/round/:currentRound/leaderboard" element={<Leaderboard />} />

          <Route path="/" element={<Navigate to="/home" replace />} />

        </Routes>

      </BrowserRouter>
  );
};


export default AppRouter;
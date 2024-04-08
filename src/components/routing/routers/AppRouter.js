import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Home from "../../views/Home";
import Login from "../../views/Login";
import Register from "../../views/Register";
import MapEndpoint from "../../views/MapEndpoint";
import Profile from "../../views/Profile";
import SetGame from "../../views/SetGame";
import Edit from "../../views/Edit";
import Lobby from "../../views/Lobby";





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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/game/*" element={<GameGuard />}>
          <Route path="/game/*" element={<GameRouter base="/game" />} />
        </Route>

        <Route path="/login" element={<LoginGuard />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />

        <Route path="/question" element={<MapEndpoint />} />

        <Route path="/profile" element={<Profile/>} />
        
        <Route path="/game/create" element={<SetGame/>} />

        <Route path="/edit" element={<Edit/>} />

        <Route path="/lobby" element={<Lobby/>} />


        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
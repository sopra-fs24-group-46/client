import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import { IsNoUserGuard } from "../routeProtectors/IsNoUserGuard";
import { IsUserGuard } from "../routeProtectors/IsUserGuard";
import { PageNotFound } from "../../views/PageNotFound";
import Home from "../../views/Home";
import Login from "../../views/Login";
import Register from "../../views/Register";
import Profile from "../../views/Profile";
import SetGame from "../../views/SetGame";
import Edit from "../../views/Edit";
import Rules from "../../views/Rules";
import ComponentDev from "../../views/ComponentDev";
import GameView from "../../game/GameView";
import EndView from "../../views/EndView";
import IsNotInGame_Guard from "../routeProtectors/IsNotInGame_Guard";
import WaitForCreation from "../../game/WaitForCreation";
import AdvancedSettings from "../../views/AdvancedSettings";

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

        {/* allway accesable */}
        <Route path="/rules" element={<Rules />} />

       {/* This are all the view which are exclusively for clients with gameId and playerId  */}
        <Route path="/game" element={<GameGuard />}>
          <Route path="/game/create" element={<IsUserGuard />}>
            <Route path="/game/create/advanced" element={<AdvancedSettings />} />
            <Route path="/game/create" element={<SetGame />} /> 
          </Route>
          <Route path="/game/ended" element={<EndView />} />
          <Route path="/game/wait_for_creation" element={<WaitForCreation />} />
          <Route path="/game/:gameId" element={<GameView />} />
          <Route path="/game" element={<GameView />} />
        </Route>
      {/* Everything else is accessable without gameId and playerId */}
        <Route path="/" element={<IsNotInGame_Guard />}>
        {/* This are all views which are exclusively for clients without id and userName */}
        <Route path="/register" element={<IsNoUserGuard />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/login" element={<IsNoUserGuard />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/home" element={<IsNoUserGuard />}>
          <Route path="/home" element={<Home />} />
        </Route>

        {/* this are all views which are exclusively for clients with id and userName */}
        <Route path="/profile" element={<IsUserGuard />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<Edit />} />
        </Route>



        {/* dev routs */}
        <Route path="/ComponentDev" element={<ComponentDev />} />
        <Route path="/GameDev" element={<GameView />} />

        {/* Redirection to home when coming to website */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        {/* todo create catch all page */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

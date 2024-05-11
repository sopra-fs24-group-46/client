import React from "react";
import { Route, Routes } from "react-router-dom";
import MapBoxComponent from "../../ui/MapBoxComponent";
import { PowerUpOverlay } from "../../ui/PowerUp";
import ComponentDev from "../../views/ComponentDev";
import Home from "../../views/Home";

import "styles/views/MapContainer.scss";

const GameRouter = () => {
  return (
    <div>
      <PowerUpOverlay powerUp="JOKER" />{" "}
      {/* This is here as a prove that it works. It is always displayed*/}
      <div className="map container">
        <MapBoxComponent reveal={0} guessesMapReveal={[]} />
      </div>
      <Routes>
        <Route path="dev" element={<ComponentDev />} />{" "}
        {/*This is accessed with localhost:3000/game/dev  */}
        <Route path="home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default GameRouter;

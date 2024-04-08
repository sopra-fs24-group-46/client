import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

import "styles/views/Lobby.scss";
import "styles/views/Header.scss";


const Lobby = () => {


  return (
    <BaseContainer>
      <h1 className="header title1">USERXY GAME LOBBY</h1>
      <div className="lobby container">
        
      </div>

      
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default Lobby;

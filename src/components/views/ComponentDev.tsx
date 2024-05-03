import React, { useState } from "react";
import {MultiSelection} from "components/ui/MultiSelection";
import {FormField} from "components/ui/FormField";
import BaseContainer from "components/ui/BaseContainer";
import {LeaderBoardPowerUp, LeaderBoardPowerUpCollection} from "components/ui/PowerUp";


const ComponentDev = () => {
    const [maxPlayers, setMaxPlayers] = useState(4);

return (
<BaseContainer>
    <div className="login container">
        <MultiSelection options = {["option 1", "option 2", "option 3", "option 4"]} onChange = {() => {}} label="test"/>
            <FormField
              label="Max number of players"
              type ="number"
              placeholder="4"
              value={maxPlayers}
              onChange={setMaxPlayers}
              style = {{width: "100px"}}
            />
        <LeaderBoardPowerUp powerUp = "JOKER"/>
        <LeaderBoardPowerUpCollection powerUpList = {["JOKER", "SHIELD"]}/>

    </div>
</BaseContainer>
  );
};

export default ComponentDev;

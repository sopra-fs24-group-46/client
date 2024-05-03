import React, { useEffect, useState } from "react";
import {MultiSelection} from "components/ui/MultiSelection";
import {FormField} from "components/ui/FormField";
import BaseContainer from "components/ui/BaseContainer";
import {LeaderBoardPowerUp, LeaderBoardPowerUpCollection} from "components/ui/PowerUp";
import {FinalLeaderboard} from "components/ui/LeaderboardComp";
import { api } from "helpers/api";

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
          <FinalLeaderboard scores={[{score: 69, distance: 0}, {score: 0, distance: 0}]} currentRound={1}/>
    </div>
</BaseContainer>
  );
};

export default ComponentDev;

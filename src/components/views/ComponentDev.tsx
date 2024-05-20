import React, { useEffect, useState } from "react";
import { MultiSelection } from "components/ui/MultiSelection";
import { FormField } from "components/ui/FormField";
import BaseContainer from "components/ui/BaseContainer";
import {
  LeaderBoardPowerUp,
  LeaderBoardPowerUpCollection,
} from "components/ui/PowerUp";
import { LeaderBoardComp } from "components/ui/LeaderboardComp";
import { api } from "helpers/api";
import ProgressBar from "components/ui/ProgressBar";
import { Button } from "components/ui/Button";
import ValidatedTextInput from "components/ui/ValidatedTextInput";
import Dropdown from "components/ui/DropDown";
import ErrorBox from "components/ui/ErrorBox";
import { useError } from "components/ui/ErrorContext";
import RedirectToGame from "components/ui/RedirectToGame";

const ComponentDev = () => {
  const [maxPlayers, setMaxPlayers] = useState(2);
  const [restartTimer, setRestartTimer] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { showError } = useError();

  return (
    <BaseContainer>
      {/* <ErrorBox message={errorMessage} onClose={() => {}} /> */}
        <RedirectToGame />
      <div className="login container">
        {/* <MultiSelection
          options={["option 1", "option 2", "option 3", "option 4"]}
          onChange={() => {}}
          label="test"
        /> */}
        {/* <Button onClick={() => setRestartTimer(true)}>test</Button> */}
        <Button onClick={() => showError("test")}>test</Button>
        <FormField
          label="Max number of players"
          type="number"
          placeholder="4"
          value={maxPlayers}
          onChange={setMaxPlayers}
          style={{ width: "50px" }}
        />
        <ValidatedTextInput validStrings={["test", "something else"]} label="test" onValidString={setErrorMessage} />
        {/* <LeaderBoardPowerUp powerUp="JOKER" />
        <LeaderBoardPowerUpCollection powerUpList={["JOKER", "SHIELD"]} /> */}
        {/* <FinalLeaderboard scores={[{score: 69, distance: 0}, {score: 0, distance: 0}]} currentRound={1}/> */}
        {/* <ProgressBar
          durationInSeconds={5}
          onFinish={() => { }}
          remainingTimeInSeconds={maxPlayers}
          restartTimer={restartTimer}
          setRestartTimer={setRestartTimer} /> */}
      </div>
    </BaseContainer>
  );
};

export default ComponentDev;

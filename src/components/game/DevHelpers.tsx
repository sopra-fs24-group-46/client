import React from "react";
import PropTypes from "prop-types";
import { Button } from "components/ui/Button";


export const storeDevGameViewJson = async (gameState: string) => {
  switch (gameState) {
    case "SETUP":
      localStorage.setItem("devGameView",
        '{"gameState":"LOBBY","roundState":"QUESTION","currentRound":0,"host":{"playerId":"player_id_0_3449","displayName":"host_player_name"},"players":[{"playerId":"player_id_0_3449","displayName":"host_player_name"},{"playerId":"player_id_1_5c6e","displayName":"player2"},{"playerId":"player_id_2_c25f","displayName":"player3"},{"playerId":"player_id_4_d030","displayName":"player4"}],"currentQuestion":null,"answers":{"player_id_0_3449":null,"player_id_1_5c6e":null,"player_id_2_c25f":null,"player_id_4_d030":null},"currentScores":{"player_id_0_3449":null,"player_id_1_5c6e":null,"player_id_2_c25f":null,"player_id_4_d030":null},"cumulativeScores":{"player_id_0_3449":{"score":0,"distance":0.0},"player_id_1_5c6e":{"score":0,"distance":0.0},"player_id_2_c25f":{"score":0,"distance":0.0},"player_id_4_d030":{"score":0,"distance":0.0}},"powerUps":{"player_id_0_3449":null,"player_id_1_5c6e":null,"player_id_2_c25f":null,"player_id_4_d030":null},"usedPowerUps":{"player_id_0_3449":[],"player_id_1_5c6e":[],"player_id_3_2f38":[],"player_id_2_c25f":[],"player_id_4_d030":[]},"questions":[{"location_name":"Matterhorn","location":{"x":7.658612,"y":45.976413}},{"location_name":"Breithorn","location":{"x":7.747732,"y":45.941012}},{"location_name":"Stockhorn","location":{"x":7.837862,"y":45.985624}},{"location_name":"Dufourspitze","location":{"x":7.866757,"y":45.936924}}],"histories":{"player_id_0_3449":{"rounds":[]},"player_id_1_5c6e":{"rounds":[]},"player_id_2_c25f":{"rounds":[]},"player_id_4_d030":{"rounds":[]}},"roundStartTime":0,"playersIds":["player_id_0_3449","player_id_1_5c6e","player_id_2_c25f","player_id_4_d030"]}'
      );
      break;
    case "QUESTION":
      localStorage.setItem("devGameView",
        '{"gameState":"PLAYING","roundState":"QUESTION","currentRound":1,"host":{"playerId":"player_id_0_3449","displayName":"host_player_name"},"players":[{"playerId":"player_id_0_3449","displayName":"host_player_name"},{"playerId":"player_id_1_5c6e","displayName":"player2"},{"playerId":"player_id_2_c25f","displayName":"player3"},{"playerId":"player_id_4_d030","displayName":"player4"}],"currentQuestion":{"location_name":"Matterhorn","location":{"x":7.658612,"y":45.976413}},"answers":{"player_id_0_3449":null,"player_id_1_5c6e":null,"player_id_2_c25f":null,"player_id_4_d030":null},"currentScores":{"player_id_0_3449":null,"player_id_1_5c6e":null,"player_id_2_c25f":null,"player_id_4_d030":null},"cumulativeScores":{"player_id_0_3449":{"score":0,"distance":0.0},"player_id_1_5c6e":{"score":0,"distance":0.0},"player_id_2_c25f":{"score":0,"distance":0.0},"player_id_4_d030":{"score":0,"distance":0.0}},"powerUps":{"player_id_0_3449":null,"player_id_1_5c6e":null,"player_id_2_c25f":null,"player_id_4_d030":null},"usedPowerUps":{"player_id_0_3449":[],"player_id_1_5c6e":[],"player_id_3_2f38":[],"player_id_2_c25f":[],"player_id_4_d030":[]},"questions":[{"location_name":"Matterhorn","location":{"x":7.658612,"y":45.976413}},{"location_name":"Breithorn","location":{"x":7.747732,"y":45.941012}},{"location_name":"Stockhorn","location":{"x":7.837862,"y":45.985624}},{"location_name":"Dufourspitze","location":{"x":7.866757,"y":45.936924}}],"histories":{"player_id_0_3449":{"rounds":[]},"player_id_1_5c6e":{"rounds":[]},"player_id_2_c25f":{"rounds":[]},"player_id_4_d030":{"rounds":[]}},"roundStartTime":1715509854162,"playersIds":["player_id_0_3449","player_id_1_5c6e","player_id_2_c25f","player_id_4_d030"]}'
      );
      break;
    case "GUESSING":
      localStorage.setItem("devGameView",
        '{"gameState":"PLAYING","roundState":"GUESSING","currentRound":1,"host":{"playerId":"player_id_0_3449","displayName":"host_player_name"},"players":[{"playerId":"player_id_0_3449","displayName":"host_player_name"},{"playerId":"player_id_1_5c6e","displayName":"player2"},{"playerId":"player_id_2_c25f","displayName":"player3"},{"playerId":"player_id_4_d030","displayName":"player4"}],"currentQuestion":{"location_name":"Matterhorn","location":{"x":7.658612,"y":45.976413}},"answers":{"player_id_0_3449":{"location":{"x":8.250084624227233,"y":46.54412836462309}},"player_id_1_5c6e":{"location":{"x":8.250084624227233,"y":46.54412836462309}},"player_id_2_c25f":null,"player_id_4_d030":null},"currentScores":{"player_id_0_3449":null,"player_id_1_5c6e":null,"player_id_2_c25f":null,"player_id_4_d030":null},"cumulativeScores":{"player_id_0_3449":{"score":0,"distance":0.0},"player_id_1_5c6e":{"score":0,"distance":0.0},"player_id_2_c25f":{"score":0,"distance":0.0},"player_id_4_d030":{"score":0,"distance":0.0}},"powerUps":{"player_id_0_3449":"X2","player_id_1_5c6e":null,"player_id_2_c25f":null,"player_id_4_d030":null},"usedPowerUps":{"player_id_0_3449":["X2"],"player_id_1_5c6e":[],"player_id_3_2f38":[],"player_id_2_c25f":[],"player_id_4_d030":[]},"questions":[{"location_name":"Matterhorn","location":{"x":7.658612,"y":45.976413}},{"location_name":"Breithorn","location":{"x":7.747732,"y":45.941012}},{"location_name":"Stockhorn","location":{"x":7.837862,"y":45.985624}},{"location_name":"Dufourspitze","location":{"x":7.866757,"y":45.936924}}],"histories":{"player_id_0_3449":{"rounds":[]},"player_id_1_5c6e":{"rounds":[]},"player_id_2_c25f":{"rounds":[]},"player_id_4_d030":{"rounds":[]}},"roundStartTime":1715509854162,"playersIds":["player_id_0_3449","player_id_1_5c6e","player_id_2_c25f","player_id_4_d030"]}'
      );
      break;
    case "MAP_REVEAL":
      localStorage.setItem("devGameView",
        `{ "gameState": "PLAYING", "roundState": "MAP_REVEAL", "currentRound": 1, "host": { "playerId": "player_id_0_3449", "displayName": "host_player_name" }, 
        "players": [{ "playerId": "player_id_0_3449", "displayName": "host_player_name" }, { "playerId": "player_id_1_5c6e", "displayName": "player2" }, { "playerId": "player_id_2_c25f", "displayName": "player3" }, { "playerId": "player_id_4_d030", "displayName": "player4" }], 
        "currentQuestion": { "location_name": "Matterhorn", "location": { "x": 7.658612, "y": 45.976413 } }, 
        "answers": { 
          "player_id_0_3449": { "location": { "x": 8.750084624227233, "y": 46.74412836462309 } }, 
          "player_id_1_5c6e": { "location": { "x": 8.250084624227233, "y": 46.54412836462309 } }, 
          "player_id_2_c25f": { "location": { "x": 8.150084624227233, "y": 46.04412836462309 } }, 
          "player_id_4_d030": null }, 
        "currentScores": { 
          "player_id_0_3449": { "score": 24, "distance": 77800.38542944145 }, 
          "player_id_1_5c6e": { "score": 12, "distance": 77798.38542944145 }, 
          "player_id_2_c25f": { "score": 1337, "distance": 80003.12342 }, 
          "player_id_4_d030": { "score": 0, "distance": null } }, 
        "cumulativeScores": { "player_id_0_3449": { "score": 24, "distance": 77798.38542944145 }, "player_id_1_5c6e": { "score": 12, "distance": 77798.38542944145 }, "player_id_2_c25f": { "score": 0, "distance": 0.0 }, "player_id_4_d030": { "score": 0, "distance": 0.0 } }, "powerUps": { "player_id_0_3449": "X2", "player_id_1_5c6e": null, "player_id_2_c25f": null, "player_id_4_d030": null }, "usedPowerUps": { "player_id_0_3449": ["X2"], "player_id_1_5c6e": [], "player_id_3_2f38": [], "player_id_2_c25f": [], "player_id_4_d030": [] }, "questions": [{ "location_name": "Matterhorn", "location": { "x": 7.658612, "y": 45.976413 } }, { "location_name": "Breithorn", "location": { "x": 7.747732, "y": 45.941012 } }, { "location_name": "Stockhorn", "location": { "x": 7.837862, "y": 45.985624 } }, { "location_name": "Dufourspitze", "location": { "x": 7.866757, "y": 45.936924 } }], "histories": { "player_id_0_3449": { "rounds": [{ "roundNumber": 1, "powerUp": "X2", "question": { "location_name": "Matterhorn", "location": { "x": 7.658612, "y": 45.976413 } }, "answer": { "location": { "x": 8.250084624227233, "y": 46.54412836462309 } }, "score": { "score": 24, "distance": 77798.38542944145 } }] }, "player_id_1_5c6e": { "rounds": [{ "roundNumber": 1, "powerUp": null, "question": { "location_name": "Matterhorn", "location": { "x": 7.658612, "y": 45.976413 } }, "answer": { "location": { "x": 8.250084624227233, "y": 46.54412836462309 } }, "score": { "score": 12, "distance": 77798.38542944145 } }] }, "player_id_2_c25f": { "rounds": [{ "roundNumber": 1, "powerUp": null, "question": { "location_name": "Matterhorn", "location": { "x": 7.658612, "y": 45.976413 } }, "answer": null, "score": { "score": 0, "distance": null } }] }, "player_id_4_d030": { "rounds": [{ "roundNumber": 1, "powerUp": null, "question": { "location_name": "Matterhorn", "location": { "x": 7.658612, "y": 45.976413 } }, "answer": null, "score": { "score": 0, "distance": null } }] } }, "roundStartTime": 1715509854162, "playersIds": ["player_id_0_3449", "player_id_1_5c6e", "player_id_2_c25f", "player_id_4_d030"] }`
      );
      break;
    case "LEADERBOARD":
      localStorage.setItem("devGameView",
        '{"gameState":"PLAYING","roundState":"LEADERBOARD","currentRound":1,"host":{"playerId":"player_id_0_3449","displayName":"host_player_name"},"players":[{"playerId":"player_id_0_3449","displayName":"host_player_name"},{"playerId":"player_id_1_5c6e","displayName":"player2"},{"playerId":"player_id_2_c25f","displayName":"player3"},{"playerId":"player_id_4_d030","displayName":"player4"}],"currentQuestion":{"location_name":"Matterhorn","location":{"x":7.658612,"y":45.976413}},"answers":{"player_id_0_3449":{"location":{"x":8.250084624227233,"y":46.54412836462309}},"player_id_1_5c6e":{"location":{"x":8.250084624227233,"y":46.54412836462309}},"player_id_2_c25f":null,"player_id_4_d030":null},"currentScores":{"player_id_0_3449":{"score":24,"distance":77798.38542944145},"player_id_1_5c6e":{"score":12,"distance":77798.38542944145},"player_id_2_c25f":{"score":0,"distance":null},"player_id_4_d030":{"score":0,"distance":null}},"cumulativeScores":{"player_id_0_3449":{"score":24,"distance":77798.38542944145},"player_id_1_5c6e":{"score":12,"distance":77798.38542944145},"player_id_2_c25f":{"score":0,"distance":0.0},"player_id_4_d030":{"score":0,"distance":0.0}},"powerUps":{"player_id_0_3449":"X2","player_id_1_5c6e":null,"player_id_2_c25f":null,"player_id_4_d030":null},"usedPowerUps":{"player_id_0_3449":["X2"],"player_id_1_5c6e":[],"player_id_3_2f38":[],"player_id_2_c25f":[],"player_id_4_d030":[]},"questions":[{"location_name":"Matterhorn","location":{"x":7.658612,"y":45.976413}},{"location_name":"Breithorn","location":{"x":7.747732,"y":45.941012}},{"location_name":"Stockhorn","location":{"x":7.837862,"y":45.985624}},{"location_name":"Dufourspitze","location":{"x":7.866757,"y":45.936924}}],"histories":{"player_id_0_3449":{"rounds":[{"roundNumber":1,"powerUp":"X2","question":{"location_name":"Matterhorn","location":{"x":7.658612,"y":45.976413}},"answer":{"location":{"x":8.250084624227233,"y":46.54412836462309}},"score":{"score":24,"distance":77798.38542944145}}]},"player_id_1_5c6e":{"rounds":[{"roundNumber":1,"powerUp":null,"question":{"location_name":"Matterhorn","location":{"x":7.658612,"y":45.976413}},"answer":{"location":{"x":8.250084624227233,"y":46.54412836462309}},"score":{"score":12,"distance":77798.38542944145}}]},"player_id_2_c25f":{"rounds":[{"roundNumber":1,"powerUp":null,"question":{"location_name":"Matterhorn","location":{"x":7.658612,"y":45.976413}},"answer":null,"score":{"score":0,"distance":null}}]},"player_id_4_d030":{"rounds":[{"roundNumber":1,"powerUp":null,"question":{"location_name":"Matterhorn","location":{"x":7.658612,"y":45.976413}},"answer":null,"score":{"score":0,"distance":null}}]}},"roundStartTime":1715509854162,"playersIds":["player_id_0_3449","player_id_1_5c6e","player_id_2_c25f","player_id_4_d030"]}'
      );
      break;
    case "ENDED":
      localStorage.setItem("devGameView",
        '{"gameState":"ENDED","roundState":"LEADERBOARD","currentRound":4,"host":{"playerId":"player_id_0_3449","displayName":"host_player_name"},"players":[{"playerId":"player_id_0_3449","displayName":"host_player_name"},{"playerId":"player_id_1_5c6e","displayName":"player2"},{"playerId":"player_id_2_c25f","displayName":"player3"},{"playerId":"player_id_4_d030","displayName":"player4"}],"currentQuestion":{"location_name":"Dufourspitze","location":{"x":7.866757,"y":45.936924}},"answers":{"player_id_0_3449":{"location":{"x":8.1275239600933,"y":45.31948126703736}},"player_id_1_5c6e":{"location":{"x":6.962830191245265,"y":45.39321126795292}},"player_id_2_c25f":{"location":{"x":7.866757,"y":45.936924}},"player_id_4_d030":{"location":{"x":40.0,"y":8.0}}},"currentScores":{"player_id_0_3449":{"score":15,"distance":71588.19737094993},"player_id_1_5c6e":{"score":9,"distance":92677.17598138907},"player_id_2_c25f":{"score":1000,"distance":0.0},"player_id_4_d030":{"score":0,"distance":5156269.880206391}},"cumulativeScores":{"player_id_0_3449":{"score":361,"distance":254174.10191907498},"player_id_1_5c6e":{"score":298,"distance":312903.4359647118},"player_id_2_c25f":{"score":3000,"distance":0.0},"player_id_4_d030":{"score":15,"distance":5227128.654442713}},"powerUps":{"player_id_0_3449":null,"player_id_1_5c6e":null,"player_id_2_c25f":null,"player_id_4_d030":null},"usedPowerUps":{"player_id_0_3449":["X2","SHIELD"],"player_id_1_5c6e":["SHIELD"],"player_id_3_2f38":[],"player_id_2_c25f":[],"player_id_4_d030":[]},"questions":[{"location_name":"Matterhorn","location":{"x":7.658612,"y":45.976413}},{"location_name":"Breithorn","location":{"x":7.747732,"y":45.941012}},{"location_name":"Stockhorn","location":{"x":7.837862,"y":45.985624}},{"location_name":"Dufourspitze","location":{"x":7.866757,"y":45.936924}}],"histories":{"player_id_0_3449":{"rounds":[{"roundNumber":1,"powerUp":"X2","question":{"location_name":"Matterhorn","location":{"x":7.658612,"y":45.976413}},"answer":{"location":{"x":8.250084624227233,"y":46.54412836462309}},"score":{"score":24,"distance":77798.38542944145}},{"roundNumber":2,"powerUp":"SHIELD","question":{"location_name":"Breithorn","location":{"x":7.747732,"y":45.941012}},"answer":{"location":{"x":6.873056823908558,"y":45.746563596789485}},"score":{"score":270,"distance":71118.88560296538}},{"roundNumber":3,"powerUp":null,"question":{"location_name":"Stockhorn","location":{"x":7.837862,"y":45.985624}},"answer":{"location":{"x":7.403048402207213,"y":45.966397341053955}},"score":{"score":52,"distance":33668.63351571823}},{"roundNumber":4,"powerUp":null,"question":{"location_name":"Dufourspitze","location":{"x":7.866757,"y":45.936924}},"answer":{"location":{"x":8.1275239600933,"y":45.31948126703736}},"score":{"score":15,"distance":71588.19737094993}}]},"player_id_1_5c6e":{"rounds":[{"roundNumber":1,"powerUp":null,"question":{"location_name":"Matterhorn","location":{"x":7.658612,"y":45.976413}},"answer":{"location":{"x":8.250084624227233,"y":46.54412836462309}},"score":{"score":12,"distance":77798.38542944145}},{"roundNumber":2,"powerUp":"SHIELD","question":{"location_name":"Breithorn","location":{"x":7.747732,"y":45.941012}},"answer":{"location":{"x":7.325249901548318,"y":46.01437005422038}},"score":{"score":270,"distance":33650.380606294646}},{"roundNumber":3,"powerUp":null,"question":{"location_name":"Stockhorn","location":{"x":7.837862,"y":45.985624}},"answer":{"location":{"x":7.082700137595784,"y":46.81376033262508}},"score":{"score":7,"distance":108777.49394758667}},{"roundNumber":4,"powerUp":null,"question":{"location_name":"Dufourspitze","location":{"x":7.866757,"y":45.936924}},"answer":{"location":{"x":6.962830191245265,"y":45.39321126795292}},"score":{"score":9,"distance":92677.17598138907}}]},"player_id_2_c25f":{"rounds":[{"roundNumber":1,"powerUp":null,"question":{"location_name":"Matterhorn","location":{"x":7.658612,"y":45.976413}},"answer":null,"score":{"score":0,"distance":null}},{"roundNumber":2,"powerUp":null,"question":{"location_name":"Breithorn","location":{"x":7.747732,"y":45.941012}},"answer":{"location":{"x":7.747732,"y":45.941012}},"score":{"score":1000,"distance":0.0}},{"roundNumber":3,"powerUp":null,"question":{"location_name":"Stockhorn","location":{"x":7.837862,"y":45.985624}},"answer":{"location":{"x":7.837862,"y":45.985624}},"score":{"score":1000,"distance":0.0}},{"roundNumber":4,"powerUp":null,"question":{"location_name":"Dufourspitze","location":{"x":7.866757,"y":45.936924}},"answer":{"location":{"x":7.866757,"y":45.936924}},"score":{"score":1000,"distance":0.0}}]},"player_id_4_d030":{"rounds":[{"roundNumber":1,"powerUp":null,"question":{"location_name":"Matterhorn","location":{"x":7.658612,"y":45.976413}},"answer":null,"score":{"score":0,"distance":null}},{"roundNumber":2,"powerUp":null,"question":{"location_name":"Breithorn","location":{"x":7.747732,"y":45.941012}},"answer":{"location":{"x":7.00138825778251,"y":46.31320891900644}},"score":{"score":15,"distance":70858.7742363212}},{"roundNumber":3,"powerUp":null,"question":{"location_name":"Stockhorn","location":{"x":7.837862,"y":45.985624}},"answer":null,"score":{"score":0,"distance":null}},{"roundNumber":4,"powerUp":null,"question":{"location_name":"Dufourspitze","location":{"x":7.866757,"y":45.936924}},"answer":{"location":{"x":40.0,"y":8.0}},"score":{"score":0,"distance":5156269.880206391}}]}},"roundStartTime":1715509854437,"playersIds":["player_id_0_3449","player_id_1_5c6e","player_id_2_c25f","player_id_4_d030"]}'
      );
      break;
    default:
      break;
  }
}

export const NavigateButtons = ({roundState, setRoundState, goToEndView, setTimerProgress }) => (
  <div>
    <Button
      style={{ position: "absolute", top: "10px", left: "10px", zIndex: 9 }}
      onClick={() => {
        storeDevGameViewJson("QUESTION");
        setRoundState("QUESTION");
        setTimerProgress(1000);
      }}
    >
      RoundStart 
    </Button>
    <Button
      style={{ position: "absolute", top: "40px", left: "10px", zIndex: 9 }}
      onClick={() => {
        storeDevGameViewJson("GUESSING");
        setRoundState("GUESSING");
        setTimerProgress(1000);
      }}
    >
      Guessing
    </Button>
    <Button
      style={{ position: "absolute", top: "70px", left: "10px", zIndex: 9 }}
      onClick={() => {
        storeDevGameViewJson("MAP_REVEAL");
        setRoundState("MAP_REVEAL");
        setTimerProgress(4000);
      }}
    >
      MapReveal
    </Button>
    <Button
      style={{ position: "absolute", top: "100px", left: "10px", zIndex: 9 }}
      onClick={() => {
        storeDevGameViewJson("LEADERBOARD");
        setRoundState("LEADERBOARD");
        setTimerProgress(4000);
      }}
    >
      LeaderBoard
    </Button>
    <Button
      style={{ position: "absolute", top: "160px", left: "10px", zIndex: 9 }}
      onClick={() => {
        storeDevGameViewJson("ENDED");
        goToEndView();
      }}
    >
      Navigate EndView
    </Button>
    <div style ={{ position: "absolute", top: "130px", left: "10px", zIndex: 9, backgroundColor: "orange" }}>
      {roundState ?? "null"}
      {
        // read local storage devGameView pares it to json and read json.roundState
        localStorage.getItem("devGameView")
          ? JSON.parse(localStorage.getItem("devGameView")).roundState
          : "no json"
      }
    </div>
  </div>
);

NavigateButtons.propTypes = {
  setRoundState: PropTypes.func,
  goToEndView: PropTypes.func,
  roundState: PropTypes.string,
  setTimerProgress: PropTypes.func
};
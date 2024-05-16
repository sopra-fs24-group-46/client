import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Spinner } from "components/ui/Spinner";
import "styles/ui/MapRevealLeaderboard.scss";
import { api } from "helpers/api";
import {LeaderBoardPowerUp} from "components/ui/PowerUp";



export const MapRevealLeaderboard = props => {

    const [dataArray, setDataArray] = useState([]);

    useEffect(() => {

        async function getGameView() {
            try {
                
                const gameView = JSON.parse(props.dataJsonString); //this is hack for the moment. todo refactor following lines out of this component
                console.log(gameView.players);

                const keys_playerIds = Object.keys(gameView.answers);
                const dataArray = keys_playerIds.map((playerId, index) => {

                    const displayNameObj = gameView.players.find(obj => obj.playerId === playerId);
                    const displayName = displayNameObj ? displayNameObj.displayName : "Unknown"; // Fallback, falls kein Name gefunden wurde
                    
                    return {
                        playerId: playerId,
                        displayName: displayName,
                        data: {
                          score: gameView.currentScores[playerId].score,
                          distance: gameView.currentScores[playerId].distance,
                          powerUp: gameView.powerUps[playerId],
                          colourNumber: index + 1
                        }
                    };
                });

                setDataArray(dataArray);

            } catch (error) {
              console.error("Error fetching game settings:", error);
            }
          }
      
          getGameView();



    }, [props.dataJsonString]);

    //console.log(dataArray);

    const getColorForNumber = (number) => {
        switch (number) {
            case 1:
                return 'orange';
            case 2:
                return 'green';
            case 3:
                return 'blue';
            case 4:
                return 'pink';
            case 5:
                return 'yellow';
            default:
                return 'gray'; // Fallback-Farbe, wenn keine spezifische Farbe angegeben ist
        }
    };


    return (
        <div className="mapRevealLeaderboard container">
            <div className="mapRevealLeaderboard text-container">
                The <span style={{ color: 'red' }}>red</span> marker shows the location of Matterhorn

            </div>

            <div className="mapRevealLeaderboard table-container">
                <table className="mapRevealLeaderboard mapReveal-table">
                    <thead>
                    <tr>
                        <th>Color</th>
                        <th>Player</th>
                        <th>Km off</th>
                        <th>Points</th>
                        <th>Powerup</th>
                    </tr>
                    </thead>
                    <tbody>
                        {dataArray.map((playerData, index) => (
                            <tr key={index}>
                                <td><div style={{backgroundColor: getColorForNumber(playerData.data.colourNumber), width: '20px', height: '20px'}} ></div> </td>
                                <td>{playerData.displayName}</td>
                                <td>{(playerData.data.distance / 1000).toFixed(2)} Km</td>
                                <td>+ {playerData.data.score}</td>
                                <td><div>
                                        {playerData.data.powerUp ? (
                                            <LeaderBoardPowerUp powerUp={playerData.data.powerUp} />
                                        ) : (
                                            "None"
                                        )}
                                    </div>
                                </td>
                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

MapRevealLeaderboard.propTypes = {
    dataJsonString: PropTypes.string,
}




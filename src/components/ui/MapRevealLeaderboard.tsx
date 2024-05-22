import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Spinner } from "components/ui/Spinner";
import "styles/ui/MapRevealLeaderboard.scss";
import { api } from "helpers/api";
import {LeaderBoardPowerUp} from "components/ui/PowerUp";



export const MapRevealLeaderboard = ({playerDataArray, numberOfRounds, currentRound, currentLocationName}) => {


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
                The <span style={{ color: 'red' }}>red</span> marker shows the location of <span style={{ color: 'red' }}>{currentLocationName}</span>.
            </div>
            <div className="mapRevealLeaderboard round-number">Round: {currentRound}\{numberOfRounds}</div>

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
                        {playerDataArray.map((playerData, index) => (
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
    currentLocationName: PropTypes.string,
    playerDataArray: PropTypes.array,
    numberOfRounds: PropTypes.number,
    currentRound: PropTypes.number
}




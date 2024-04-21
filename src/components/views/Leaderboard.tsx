import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, handleError, getAuthToken } from "helpers/api";
import BaseContainer from "components/ui/BaseContainer";
import ProgressBar from "components/ui/ProgressBar";
import MapBoxComponent from './MapBoxComponent';
import { Spinner } from "components/ui/Spinner";

//Leaderboard container gets styled in here
import "styles/views/Leaderboard.scss";

//map container gets styled in here
import "styles/views/Question.scss";

const Leaderboard_roundEnd = () => {

    const navigate = useNavigate();
    const mapboxAccessToken = 'pk.eyJ1IjoiYW1lbWJhZCIsImEiOiJjbHU2dTF1NHYxM3drMmlueDV3ZGtvYTlvIn0.UhwX7hVWfe4fJA-cjCX70w';

    const [gameInfo, setGameInfo] = useState(null);


    //Process to get data from backend 
    useEffect(() => {

        async function getGameView() {
        try {
            const gameId = localStorage.getItem("gameId");
            
            //Possibility to get Example JSON's from backend
            //const response = await api.get(`/game/developer/getView/game1_4_Round1Started`);

            const response = await api.get(`game/${gameId}/getView`);
            const data = response.data;
            setGameInfo(data);

        } catch (error) {
            console.error("Error fetching game settings:", error);
        }
        };

        getGameView();
    }, []);


    //Function needed by map
    const handleonSubmitAnswer = () => {
        console.log("Submitting something");

   
    };

    //Checks if Data, which gets loaded from backend in useEffect, is ready to be displayed
    if (gameInfo) {
        return (
            <BaseContainer>
                <div className="leaderboard container">

                    Hier kommt Leaderboard Component hin.

                    Example Data:{gameInfo.currentRound}
                </div>
                <div className="map container">
                <MapBoxComponent
                    mapboxAccessToken={mapboxAccessToken}
                    onSubmitAnswer={handleonSubmitAnswer}
                />
                </div>
            </BaseContainer>
        );
    }
        
  


}

export default Leaderboard_roundEnd;
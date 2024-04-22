import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types'; // Import PropTypes
import { useNavigate } from "react-router-dom";
import { api } from "helpers/api";
import BaseContainer from "components/ui/BaseContainer";
import ProgressBar from "components/ui/ProgressBar";
import MapBoxComponent from './MapBoxComponent';
import "styles/views/Question.scss";
import "styles/ui/Progressbar.scss";


const Question_guessing = () => {
    const navigate = useNavigate();
    const mapboxAccessToken = 'pk.eyJ1IjoiYW1lbWJhZCIsImEiOiJjbHU2dTF1NHYxM3drMmlueDV3ZGtvYTlvIn0.UhwX7hVWfe4fJA-cjCX70w';
    let isTimerFinished = false;
    const currentRound = localStorage.getItem("currentRound");

    const handleProgressBarFinish = () => {
        if (!isTimerFinished) {
            console.log("Map Reveal");
            //also check the lobby navigate(`/game/${localStorage.getItem("gameId")}/round/${currentRound}/leaderboard`);
        }
    };

    const handleonSubmitAnswer = () => {
        return;
    };

    return (
        <BaseContainer>
            <div className="map question_container">
                <div className="map text1">Round {localStorage.getItem("currentRound")}</div>
                <div className="map text2">Find mountain: {localStorage.getItem("currentLocationName")}</div>
                <div className="map text3">Select a location by clicking on the map.</div>
            </div>
            <div className="map container">
                <MapBoxComponent
                    mapboxAccessToken={mapboxAccessToken}
                    onSubmitAnswer={handleonSubmitAnswer}
                />
            </div>
            <ProgressBar durationInSeconds={localStorage.getItem("guessingTime")} onFinish={handleProgressBarFinish} />
        </BaseContainer>
    );
};

// Add prop types validation
Question_guessing.propTypes = {
    gameId: PropTypes.string.isRequired,
};

export default Question_guessing;

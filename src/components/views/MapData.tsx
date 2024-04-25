import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MapBoxComponent from './MapBoxComponent';
import { Score } from 'helpers/types';
import { api } from 'helpers/api';

const MapData = ({
                   gameState,
                   currentQuestionLocation,
                   currentQuestionName,
                   roundState,
                   mapboxAccessToken,
                   onSubmitAnswer,
                   playerId: initialPlayerId,
                   gameId,
                   playerScores,
                   cumulativeScores,
                   selectedCoordinates,
                 }) => {
  const [playerId, setPlayerId] = useState(initialPlayerId);



  return (
    <div>
      <h2>Game State: {gameState}</h2>
      <h3>Current Question: {currentQuestionName}</h3>
      <h4>Round State: {roundState}</h4>
      <h4>Player: {playerId}</h4>
      <h5>Click anywhere on the map to guess:</h5>
      <MapBoxComponent
        reveal={1}
        guessesMapReveal={[]}
      />
      <div>
        <h3>Time left: (seconds)</h3>
      </div>
    </div>
  );
};

MapData.propTypes = {
  gameState: PropTypes.string.isRequired,
  currentQuestionLocation: PropTypes.object,
  playerId: PropTypes.string,
  gameId: PropTypes.string.isRequired,
  currentQuestionName: PropTypes.string.isRequired,
  roundState: PropTypes.string.isRequired,
  mapboxAccessToken: PropTypes.string.isRequired,
  onSubmitAnswer: PropTypes.func.isRequired,
  playerScores: PropTypes.object.isRequired,
  cumulativeScores: PropTypes.object.isRequired,
  selectedCoordinates: PropTypes.object.isRequired,
};

export default MapData;






/* monday 15-04-2024
import React from 'react';
import MapBoxComponent from './MapBoxComponent';

interface MapDataProps {
  currentQuestion: string;
  mapboxAccessToken: string;
  gameId: string;
  playerId: string;
  onSubmitAnswer: (coordinates: { latitude: number; longitude: number }) => void;
}

const MapData: React.FC<MapDataProps> = ({ currentQuestion, mapboxAccessToken, gameId, playerId, onSubmitAnswer }) => {
  const initialCenter = [8.2275, 46.8182]; // Center of Switzerland

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h2>{currentQuestion}</h2>
      <MapBoxComponent

      //currentQuestionName={currentQuestionName}
        //currentQuestionLocation={currentQuestionLocation}
        //playerId={playerId}
        //gameId={gameId}
        //roundState={roundState}
        initialCenter={initialCenter}
        zoom={6}
        mapboxAccessToken={mapboxAccessToken}
        gameId={gameId}
        playerId={playerId}
        onSubmitAnswer={onSubmitAnswer}
      />
    </div>
  );
};

export default MapData;

*/


/*
import React from 'react';
import MapBoxComponent from './MapBoxComponent';

interface MapDataProps {
  currentQuestion: {
    location_name: string;
    location: {
      x: number;
      y: number;
    };
  };
  mapboxAccessToken: string;
  gameId: string;
  playerId: string;
  onSubmitAnswer: (coordinates: { latitude: number; longitude: number }) => void;
}

const MapData: React.FC<MapDataProps> = ({
                                           currentQuestion,
                                           mapboxAccessToken,
                                           gameId,
                                           playerId,
                                           onSubmitAnswer,
                                         }) => {
  const questionCoordinates = {
    longitude: currentQuestion.location.x,
    latitude: currentQuestion.location.y,
  };

  return (
    <MapBoxComponent
      initialCenter={[questionCoordinates.longitude, questionCoordinates.latitude]}
      zoom={6}
      mapboxAccessToken={mapboxAccessToken}
      gameId={gameId}
      playerId={playerId}
      onSubmitAnswer={onSubmitAnswer}
    />
  );
};

export default MapData;*/

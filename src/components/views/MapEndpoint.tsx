import React, { useState, useEffect } from 'react';
import MapData from './MapData';
import { Player, Score } from 'helpers/types';
import {useNavigate} from "react-router-dom";
import { getDomain } from "helpers/getDomain";
import { api, handleError } from "helpers/api";

function App() {
  const navigate = useNavigate();
  const gameId = localStorage.getItem('gameId');
  const userId = localStorage.getItem('playerId');
  const token = localStorage.getItem('token');
  const [gameState, setGameState] = useState<string>('');
  const [currentQuestionLocation, setCurrentQuestionLocation] = useState<{ x: number, y: number } | ''>('');
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ x: number, y: number } | ''>('');
  const [currentQuestionName, setCurrentQuestionName] = useState<string>('');
  const [roundState, setRoundState] = useState<string>('');
  // const [playerId, setPlayerId] = useState<string>('');
  const playerId = localStorage.getItem("playerId");
  const [playerScores, setPlayerScores] = useState<Record<string, Score>>({});
  const [cumulativeScores, setCumulativeScores] = useState<Record<string, Score>>({});
  const mapboxAccessToken = 'pk.eyJ1IjoiYW1lbWJhZCIsImEiOiJjbHU2dTF1NHYxM3drMmlueDV3ZGtvYTlvIn0.UhwX7hVWfe4fJA-cjCX70w';

  useEffect(() => {
    fetchGameState();
  }, []);

  const fetchGameState = () => {
    // Fetch game state from backend using gameId
    fetch(`${getDomain()}game/${gameId}/getView`)
      .then(response => response.json())
      .then(data => {
        // check the data
        console.log(data);
        if (data.gameState === 'ENDED') {
          // Handle game end condition
          console.log('Game has ended');
          //navigate('leaderboard');
        } else {
          setGameState(data.gameState);
          setCurrentQuestionLocation(data.currentQuestion["location"]);
          setCurrentQuestionName(data.currentQuestion["location_name"]);
          setRoundState(data.roundState);
          playerId;// (data.players.find((player: Player) => player.playerId === userId)?.playerId || '');

          //setPlayerScores(data.currentScores);
          //setCumulativeScores(data.cumulativeScores);

          // Call function to update playerScores after each round
          // updatePlayerScores(data.currentScores);
        }
      })
      .catch(error => {
        console.error('Error fetching game state:', error);
      });
  };


  const handleAnswerSubmit = async (coordinates: { x: number, y: number }, playerId: string, gameId: string, roundState: string) => {
    if (roundState !== 'GUESSING') {
      console.log('Answers are only allowed during guessing. Current state:', roundState);
      return; // Prevent further execution
    }

    setSelectedCoordinates(coordinates);

    try {
      const response = await api.post(`${getDomain()}game/${gameId}/guess`, {
        playerId,
        x: coordinates.x,
        y: coordinates.y,
      });
      if (!response.ok) {
        throw new Error(`Server error: [${response.status}] [${response.statusText}] [${response.url}]`);
      }
      const receivedJson = await response.json();
      // Handle the received JSON data
      console.log(receivedJson);
    } catch (error) {
      console.debug("Error in API call", error);
      handleError(error); // Handle error using helper function
    }
  };

  return (
    <div>
      <MapData
        gameState={gameState}
        currentQuestionLocation={currentQuestionLocation}
        currentQuestionName={currentQuestionName}
        roundState={roundState}
        mapboxAccessToken={mapboxAccessToken}
        onSubmitAnswer={handleAnswerSubmit}
        gameId={gameId}
        playerId={playerId}
        playerScores={playerScores}
        cumulativeScores={cumulativeScores}
        selectedCoordinates={selectedCoordinates}
      />
    </div>
  );
}

export default App;

/*
import React, { useState, useEffect } from 'react';

import MapData from './MapData';
import { Player, Score } from 'helpers/types';

function App() {
  const gameId = localStorage.getItem('gameId');
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const [gameState, setGameState] = useState<string>('');
  const [currentQuestionLocation, setCurrentQuestionLocation] = useState<{ x: number, y: number } | ''>('');
  const [selectedCoordinates, setselectedCoordinates] = useState<{ x: number, y: number } | ''>('');
  const [currentQuestionName, setCurrentQuestionName] = useState<string>('');
  const [roundState, setRoundState] = useState<string>('');
  const [playerId, setPlayerId] = useState<string>('');
  const [playerScores, setPlayerScores] = useState<Record<string, Score>>({});
  const [cumulativeScores, setCumulativeScores] = useState<Record<string, Score>>({});
  const mapboxAccessToken = 'pk.eyJ1IjoiYW1lbWJhZCIsImEiOiJjbHU2dTF1NHYxM3drMmlueDV3ZGtvYTlvIn0.UhwX7hVWfe4fJA-cjCX70w';



  const fetchGameState = () => {
    // Fetch game state from backend using gameId
    fetch(`${getDomain()}game/${gameId}/getView`)
      .then(response => response.json())
      .then(data => {
        // check te data
        console.log(data);
        if (data.gameState === 'ENDED') {
          // Handle game end condition
          console.log('Game has ended');
          //navigate('leaderboard');
        } else {

          setGameState(data.gameState);
          setCurrentQuestionLocation(data.currentQuestion.location); // does not workk
          setCurrentQuestionName(data.currentQuestion["location_name"]);
          setRoundState(data.roundState);
          setPlayerId(data.players.find((player: Player) => player.playerId === userId)?.id || '');
          setPlayerScores(data.currentScores);
          setCumulativeScores(data.cumulativeScores);

          // Call function to update playerScores after each round
          updatePlayerScores(data.currentScores);
        }
      })
      .catch(error => {
        console.error('Error fetching game state:', error);
      });
  };

  const updatePlayerScores = (newScores: Record<string, Score>) => {
    setPlayerScores(newScores);
  };


  const handleAnswerSubmit = (coordinates) => {
    /*
    * if (data.gameState !== 'GUESSING') {
      console.log('Answers are only allowed during guessing. Current state:', roundState);
      return; // Prevent further execution
    }
    *
    * */


    // Implement logic to send coordinates (longitude, latitude) along with player ID to backend API for answer submission

/* date: 2024-17-04

  useEffect(() => {
    fetchGameState();

    fetch(`${getDomain()}game/${gameId}/guess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerId,
        x: coordinates.longitude,
        y: coordinates.latitude
      }),
    })
      .then(it => {
        if (!it.ok) {
          throw `Server error: [${it.status}] [${it.statusText}] [${it.url}]`;
        }
        return it.json();
      })
      .then(receivedJson => {
        // your code with json here...
      })
      .catch(err => {
        console.debug("Error in fetch", err);

      });
  };

  }, []);


  return (
    <div>
      <MapData
        gameState={gameState}
        currentQuestionLocation={currentQuestionLocation}
        currentQuestionName={currentQuestionName}
        roundState={roundState}
        mapboxAccessToken={mapboxAccessToken}
        onSubmitAnswer={handleAnswerSubmit}
        gameId={gameId}
        playerId={playerId}
        playerScores={playerScores}
        cumulativeScores={cumulativeScores}
      />
    </div>
  );
}

export default App;
*/


/* 15-04-2024
import React, { useState } from 'react';
import MapData from './MapData';

function App() {
  const gameId = localStorage.getItem("gameId");
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [gameState, setGameState] = useState<string>("QUESTION"); // Replace with logic to get game ID
  const [playerId, setPlayerId] = useState<string>('123'); // Replace with logic to get player ID
  const mapboxAccessToken = 'pk.eyJ1IjoiYW1lbWJhZCIsImEiOiJjbHU2dTF1NHYxM3drMmlueDV3ZGtvYTlvIn0.UhwX7hVWfe4fJA-cjCX70w';
  const currentQuestion = 'Find Lake Genevè'; // Replace with logic to get current question

  const handleAnswerSubmit = (coordinates: { latitude: number; longitude: number }) => {
    // Implement logic to send coordinates (longitude, latitude) along with game ID and player ID to backend API for answer submission
    fetch(`/game/${gameId}/guess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerId,
        x: coordinates.longitude,
        y: coordinates.latitude,
      }),

    })
      .then(response => {
        console.log(coordinates);
        if (!response.ok) {
          throw new Error('Network response shows no connection to server');
        }
        // You can handle success response here if needed
      })
      .catch(error => {
        console.error('Error submitting answer:', error);
      });
  };

  return (
    <div>
      <strong>Question:</strong>
      <MapData
        currentQuestion={currentQuestion}
        mapboxAccessToken={mapboxAccessToken}
        gameId={gameId}
        playerId={playerId}
        onSubmitAnswer={handleAnswerSubmit}
      />
    </div>
  );
}

export default App;
*/



/*import React, { useState } from 'react';
import MapData from './MapData';

function App() {
  const [gameId, setGameId] = useState<string>('1'); // Replace with logic to get game ID
  const [playerId, setPlayerId] = useState<string>('123'); // Replace with logic to get player ID
  const mapboxAccessToken = 'pk.eyJ1IjoiYW1lbWJhZCIsImEiOiJjbHU2dTF1NHYxM3drMmlueDV3ZGtvYTlvIn0.UhwX7hVWfe4fJA-cjCX70w';

  const handleAnswerSubmit = (coordinates: { latitude: number; longitude: number }) => {
    // Implement logic to send coordinates (longitude, latitude) along with game ID and player ID to backend API for answer submission
    fetch(`/game/${gameId}/guess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerId,
        x: coordinates.longitude,
        y: coordinates.latitude,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response shows no connection to server');
        }
        // You can handle success response here if needed
      })
      .catch(error => {
        console.error('Error submitting answer:', error);
      });
  };

  return (
    <div>
      <strong>Question:</strong>
      <MapData
        gameId={gameId}
        playerId={playerId}
        mapboxAccessToken={mapboxAccessToken}
        onSubmitAnswer={handleAnswerSubmit}
        currentQuestion={{ location_name: 'Lenzspitze', location: { x: 0, y: 0 } }}
      />
    </div>
  );
}

export default App;
*/
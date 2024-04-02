import React, { useState } from 'react';
import MapBoxComponent from "./components/views/MapBoxComponent";


function App() {
  const [gameId, setGameId] = useState(1); // Replace with logic to get game ID
  const [playerId, setPlayerId] = useState(123); // Replace with logic to get player ID
  const mapboxAccessToken = 'pk.eyJ1IjoiYW1lbWJhZCIsImEiOiJjbHU2dTF1NHYxM3drMmlueDV3ZGtvYTlvIn0.UhwX7hVWfe4fJA-cjCX70w'; // Replace with your access token

  // Function to handle answer submission
  const handleAnswerSubmit = (coordinates) => {
    // Implement logic to send coordinates (longitude, latitude) along with game ID and player ID to backend API for answer submission
    fetch('/api/submit-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gameId,
        playerId,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response shows no connection to server');
        }
        return response.json();
      })
      .then(data => {
        // Handle backend response (e.g., display success/error message)
        console.log(data); // For example, log the response data
      })
      .catch(error => {
        console.error('Error submitting answer:', error);
      });
  };
  return (
    <div>
      <h1>Gwüsst!!</h1>
      <div style="text-align: center; margin: 0 auto;">
        <p>Find Lake Genevè.</p>
      </div>
      <MapBoxComponent
        initialCenter={[8.227512, 46.818188]} // Example initial center coordinates
        zoom={6} // Example zoom level
        mapboxAccessToken={mapboxAccessToken}
        gameId={gameId}
        playerId={playerId}
        onSubmitAnswer={handleAnswerSubmit}
      />
    </div>
  );
}

export default App;

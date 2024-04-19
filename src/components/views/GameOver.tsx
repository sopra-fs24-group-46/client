import React, { useState, useEffect } from 'react';
import { api } from 'helpers/api';

const GameOver = () => {
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    fetchGameView();
  }, []);

  const fetchGameView = async () => {
    try {
      const response = await api.get('/game/${gameId}/leave');
      setGameState(response.data);
    } catch (error) {
      console.error('Error fetching game view:', error);
    }
  };

  return (
    <div>
      <h2>Game Over</h2>
      {/* Display final game state information */}
    </div>
  );
};

export default GameOver;

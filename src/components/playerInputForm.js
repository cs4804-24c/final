import React, { useState } from 'react';

function PlayerInputForm({ onSubmitPlayerName }) {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmitPlayerName(playerName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Player Name:
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default PlayerInputForm;

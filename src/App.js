import './App.css';
import React, { useState, useEffect } from 'react';
import PlayerInputForm from './components/playerInputForm';
import ShotChart from './components/shotChart';

function App() {
  const [playerName, setPlayerName] = useState('');
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    const filteredData = allShotsData.filter(shot => shot.playerName === playerName);
    setPlayerData(filteredData);
  }, [playerName]);

  return (
    <div className="App">
    
    </div>
);
}

export default App;

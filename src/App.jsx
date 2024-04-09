import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AllPersons from './AllPersons';
import Films from './Films';
import ImperialMarch from '../public/StarWars.mp4'; // Import the audio file

function NavBar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Create a ref to hold the audio element

  const toggleAudio = () => {
    const audio = audioRef.current; // Get the audio element from the ref
    if (!audio) return;

    if (isPlaying) {
      audio.pause(); // Pause if currently playing
    } else {
      audio.play(); // Play if currently paused
    }
    setIsPlaying(!isPlaying); // Toggle the state
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/films">Films</Link>
        </li>
        <li>
          <Link to="/persons">Persons</Link>
        </li>
        <li className={!isPlaying ? 'play-button-li' : ''}>
          <button className="play-button" onClick={toggleAudio}>
            {isPlaying ? 'Stop Imperial March' : 'Play Imperial March'}
          </button>
        </li>
      </ul>
      <audio ref={audioRef} src={ImperialMarch} /> {/* Audio element */}
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/films" element={<Films />} />
          <Route path="/persons" element={<AllPersons />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

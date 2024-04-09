import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Import Link along with BrowserRouter and Routes
import AllPersons from './AllPersons'; // Import the AllPersons component
import Films from './Films'; // Import the Films component

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/films">Films</Link>
        </li>
        <li>
          <Link to="/persons">Persons</Link>
        </li>
      </ul>
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

// import React from 'react';
// import './App.css';
// import { useQuery } from "@tanstack/react-query";
// import { request } from "graphql-request";
// import { allPlanets } from "./queries/allPlanets";

// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// function App() {
//   const baseUrl = `https://swapi-graphql.netlify.app/.netlify/functions/index`;

//   const { data: planets, isLoading, error } = useQuery({
//     queryKey: ["allplanets"],
//     queryFn: async () => request(baseUrl, allPlanets),
//   });

//   if (isLoading) {
//     return <span>Loading...</span>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   if (!planets || !planets.allPlanets) {
//     return <p>No planet data available.</p>;
//   }

//   const { planets: planetData } = planets.allPlanets;

//   return (
//     <>
//       <h1>Hello world</h1>
//       {planetData.map((planet) => (
//         <div key={planet.id}>
//           <h5>{planet.name}</h5>
//           <p>Gravity: {planet.gravity}</p>
//           <p>Population: {planet.population && numberWithCommas(planet.population)}</p>
//         </div>
//       ))}
//     </>
//   );
// }

// export default App;

import React, { useState } from 'react';
import './App.css';
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { allFilms } from "./queries/allFilms";

function App() {
  const baseUrl = `https://swapi-graphql.netlify.app/.netlify/functions/index`;

  const { data: films, isLoading, error } = useQuery({
    queryKey: ["allFilms"],
    queryFn: async () => request(baseUrl, allFilms),
  });

  const [selectedFilm, setSelectedFilm] = useState(null);

  const openModal = (film) => {
    setSelectedFilm(film);
  };

  const closeModal = () => {
    setSelectedFilm(null);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log('films:', films);

  // Check if films or films.allFilms exists before attempting to access them
  if (!films || !films.allFilms) {
    return <p>No film data available.</p>;
  }

  const { films: filmData } = films.allFilms;

  return (
    <div className="film-grid-container">
      <h1>Star Wars</h1>
      <h2>Films</h2>
      <div className="film-grid">
        {filmData.map((film) => (
          <div key={film.episodeID} className="film-card" onClick={() => openModal(film)}>
            <h5>{film.title}</h5>
            <p>Director: {film.director}</p>
            {/* Additional details can be shown here */}
          </div>
        ))}
      </div>
      {selectedFilm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedFilm.title}</h2>
            <p>Director: {selectedFilm.director}</p>
            <p>{selectedFilm.openingCrawl}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;




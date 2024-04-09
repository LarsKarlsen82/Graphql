// Films.jsx
import React, { useState } from 'react';
import './App.css';
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { allFilms } from "./queries/allFilms";

function Films() {
  const baseUrl = `https://swapi-graphql.netlify.app/.netlify/functions/index`;

  const { data: films, isLoading, error } = useQuery({
    queryKey: ["allFilms"],
    queryFn: async () => request(baseUrl, allFilms),
  });

  const [selectedFilm, setSelectedFilm] = useState(null);

  const openModal = (film) => {
    setSelectedFilm(film);
    changeBackgroundImage(film.episodeID);
  };

  const closeModal = () => {
    setSelectedFilm(null);
    resetBackgroundImage();
  };

  const changeBackgroundImage = (episodeID) => {
    const imageUrl = getBackgroundImage(episodeID);
    document.body.style.backgroundImage = `url(${imageUrl})`;
  };

  const resetBackgroundImage = () => {
    document.body.style.backgroundImage = `url('/StarWars.jpg')`;
    document.body.style.backgroundSize = 'cover'; // Ensure background size remains cover
    document.body.style.backgroundPosition = 'center'; // Ensure background position remains centered
    document.body.style.backgroundRepeat = 'no-repeat'; // Ensure background does not repeat
  };

  const getBackgroundImage = (episodeID) => {
    switch (episodeID) {
      case 1:
        return '/thePhantomMenace.png';
      case 2:
        return '/attackOfTheClones.jpg';
      case 3:
        return '/revenge.png';
      case 4:
        return '/aNewHope.png';
      case 5:
        return '/TheEmpireStrikesBack.jpg'; 
      case 6:
        return '/ReturnOfTheJedi.png';
      // Add cases for other films
      default:
        return '';
    }
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

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

export default Films;

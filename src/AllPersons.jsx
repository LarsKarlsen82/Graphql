// AllPersons.jsx
import React, { useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { allPersonsQuery } from './queries/allPersons'; 

function AllPersonsPage() {
  const baseUrl = `https://swapi-graphql.netlify.app/.netlify/functions/index`;

  const { data: persons, isLoading, error } = useQuery({
    queryKey: ["allPersons"],
    queryFn: async () => request(baseUrl, allPersonsQuery), 
  });

  useEffect(() => {
    if (persons) {
      console.log('Persons:', persons); 
    }
  }, [persons]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!persons || !persons.allPersons) {
    return <p>No person data available.</p>;
  }

  const { persons: personData } = persons.allPersons;

  return (
    <div className="person-grid-container">
      <h1>Star Wars Characters</h1>
      <div className="person-grid">
        {personData.map((person) => (
          <div key={person.id} className="person-card"> 
            <h5>{person.name}</h5>
            <p>Birth Year: {person.birthYear}</p>
            <p>Gender: {person.gender}</p>
            <p>Height: {person.height}</p>
            <p>Mass: {person.mass}</p>
            <p>Homeworld: {person.homeworld}</p>
            <p>Species: {person.species}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPersonsPage;

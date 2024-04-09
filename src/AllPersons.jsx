// import React, { useEffect } from 'react';
// import { useQuery } from "@tanstack/react-query";
// import { request } from "graphql-request";
// import { allPersonsQuery } from './queries/allPersons'; 

// function AllPersonsPage() {
//   const baseUrl = `https://swapi-graphql.netlify.app/.netlify/functions/index`;

//   const { data: response, isLoading, error } = useQuery({
//     queryKey: ["allPersons"],
//     queryFn: async () => request(baseUrl, allPersonsQuery), 
//   });

//   useEffect(() => {
//     if (response) {
//       console.log('Persons:', response); 
//     }
//   }, [response]);

//   if (isLoading) {
//     return <span>Loading...</span>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   if (!response || !response.allPeople || !response.allPeople.people) {
//     return <p>No person data available.</p>;
//   }

//   const { people: personData } = response.allPeople;

//   return (
//     <div className="person-grid-container">
//       <h1>Star Wars Characters</h1>
//       <div className="person-grid">
//         {personData.map((person, index) => (
//           <div key={index} className="person-card"> 
//             <h5>{person.name}</h5>
//             <p>Birth Year: {person.birthYear}</p>
//             <p>Gender: {person.gender}</p>
//             <p>Height: {person.height}</p>
//             <p>Mass: {person.mass}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AllPersonsPage;


import React, { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { allPersonsQuery } from './queries/allPersons'; 

function AllPersonsPage() {
  const baseUrl = `https://swapi-graphql.netlify.app/.netlify/functions/index`;

  const { data: response, isLoading, error } = useQuery({
    queryKey: ["allPersons"],
    queryFn: async () => request(baseUrl, allPersonsQuery), 
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    setFilteredPersons([]); // Initially, no persons to display
  }, []);

  useEffect(() => {
    if (response && response.allPeople && response.allPeople.people) {
      const filtered = response.allPeople.people.filter(person =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPersons(filtered);
    }
  }, [response, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="person-grid-container">
      <h1>Star Wars Characters</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by name..."
        style={{ backgroundColor: '#f0f0f0', padding: '10px', marginBottom: '10px' }}
      />
      <div className="person-grid">
        {filteredPersons.map((person, index) => (
          <div key={index} className="person-card"> 
            <h5>{person.name}</h5>
            <p>Birth Year: {person.birthYear}</p>
            <p>Gender: {person.gender}</p>
            <p>Height: {person.height}</p>
            <p>Mass: {person.mass}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPersonsPage;

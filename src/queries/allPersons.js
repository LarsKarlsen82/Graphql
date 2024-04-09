// allPersons.js
import { gql } from "graphql-request";

export const allPersonsQuery = gql`
  query Persons {
    allPersons {
      persons {
        id
        name
        birthYear
        gender
        height
        mass
        homeworld
        species
      }
    }
  }
`;
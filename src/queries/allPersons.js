import { gql } from "graphql-request";

export const allPersonsQuery = gql`
  query Persons {
    allPeople {
      people {
        name
        gender
        mass
        height
        birthYear
      }
    }
  }
`;

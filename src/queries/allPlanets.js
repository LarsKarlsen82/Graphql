import { gql } from "graphql-request";

export const allPlanets = gql`
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
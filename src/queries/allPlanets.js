import { gql } from "graphql-request";

export const allPlanets = gql`
  query Planets {
    allPlanets {
      planets {
        name
        id
        gravity
        terrains
        population
      }
    }
  }
`;
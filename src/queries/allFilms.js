//allFilms.js
import { gql } from "graphql-request";

export const allFilms = gql`
  query Films {
    allFilms {
      films {
        title
        director
        episodeID
        openingCrawl
    }
  }
}
`;

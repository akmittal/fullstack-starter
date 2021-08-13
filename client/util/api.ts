import { gql } from '@apollo/client';

import client from './apollo-client';

export const GET_STRATERGIES = gql`
  query {
    stratergies {
      name
      id
      deployed
      squareoffType
      entryTime
      exitTime
    }
  }
`;



export const getStratergies = (): Promise<any> => {
  return client.query({ query: GET_STRATERGIES,fetchPolicy:"no-cache" });
};

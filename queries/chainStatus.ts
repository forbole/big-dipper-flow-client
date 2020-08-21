import { gql } from '@apollo/client';

export const CHAIN_STATUS = gql`
  query ChainStatus {
    chain_state {
      averageBlockTime
      latestHeight
      latestTimestamp
    }
    transaction_aggregate {
      aggregate {
        count
      }
    }
    collection_aggregate {
      aggregate {
        count
      }
    }
  }
`;

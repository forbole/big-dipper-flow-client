import { gql } from '@apollo/client';

export const CHAIN_STATUS = gql`
  query ChainStatus {
    chain_state {
      averageBlockTime
      latestHeight
      latestTimestamp
    }
  }
`

export const LATEST_HEIGHT = gql`
  query LatestHeight {
    chain_state {
      latestHeight
    }
  }
`

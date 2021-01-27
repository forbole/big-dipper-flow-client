import { gql } from '@apollo/client';

export const TOTAL_SUPPLY = gql`
  query GetFlowSupply {
    getSupply
  }
`
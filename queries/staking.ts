import { gql } from '@apollo/client';

export const stakingStatus = gql`
    query stakingStatus{
        totalStake
        getSupply
        weeklyPayout
    }
`;
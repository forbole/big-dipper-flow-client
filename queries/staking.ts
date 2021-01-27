import { gql } from '@apollo/client';

export const STAKING_OVERVIEW = gql`
    query stakingOverview {
        cutPercentage
        getSupply
        totalStake
        weeklyPayout
    }
`;

export const TOTAL_STAKE_BY_TYPE = gql`
    query totalStakeByType($role: Int!){
        totalStakeByType(role: $role)
        nodeTypeRatio(role: $role)
    }
`;

export const WEEKLY_PAYOUT = gql`
    query weeklyPayout{
        weeklyPayout
    } 
` 
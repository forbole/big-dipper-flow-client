import { gql } from '@apollo/client';

export const STAKING_STATUS = gql`
    query stakingStatus{
        totalStake
        getSupply
        weeklyPayout
    }
`;

export const TOTAL_STAKE_BY_TYPE = gql`
    query totalStakeByType($role: Int!){
        totalStakeByType(role: $role)
        nodeTypeRatio(role: $role)
    }
`;
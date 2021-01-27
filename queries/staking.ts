import { gql } from '@apollo/client';

export const stakingStatus = gql`
    query stakingStatus{
        totalStake
        getSupply
        weeklyPayout
    }
`;

export const totalStakeByType = gql`
    query totalStakeByType($role: Int!){
        totalStakeByType(role: $role)
    }
`;
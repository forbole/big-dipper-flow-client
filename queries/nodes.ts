import { gql } from '@apollo/client';

export const NODES = gql`
    query Nodes($type: String) {
        node(where: {role: {_eq: $type}}, order_by: {address: desc}) {
            address
            networkPubKey
            nodeId
            role
            stake
            stakingPubKey
        }
        node_aggregate(where: {role: {_eq: $type}}) {
            aggregate {
                count
            }
        }
    }
`;

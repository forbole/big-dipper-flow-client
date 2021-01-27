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

export const STAKING_NODES = gql`
    query StakingNodes{
        stakingNodes{
            nodes
        }
    }
`;

export const NODE_INFO = gql`
    query NodeInfo($nodeId: String!) {
        nodeInfo(nodeID: $nodeId)
    }
`

export const NODE_COUNT = gql`
    query count{
        node_aggregate {
            aggregate {
                count
            }
        }
    }
`
import { gql } from "@apollo/client";

export const ACCOUNT = gql`
    query Account($address: String!) {
        account(address: $address) {
            address
            balance
            code
            keysList
            contractsMap
        }
    }
`

export const ACCOUNT_DETAIL = gql`
    query getAccount($address: String!) {
        lockedAccountAddress(address: $address)
        lockedAccountBalance(address: $address)
        unlockLimit(address: $address)
        delegatorNodeInfo(address: $address)
        stakerNodeInfo(address: $address)
    }
`
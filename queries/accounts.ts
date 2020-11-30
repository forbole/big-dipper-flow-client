import { gql } from "@apollo/client";

export const ACCOUNT = gql`
    query Account($address: String!) {
        account(address: $address) {
            address
            balance
            code
            keysList
        }
    }
`
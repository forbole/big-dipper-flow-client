import { gql } from "@apollo/client";

export const TRANSACTIONS_LIST = gql`
    query TransactionsList($limit: Int = 10, $offset: Int = 0, $order: [transaction_order_by!] = {height: desc}) {
        transaction(limit: $limit, order_by: $order, offset: $offset) {
            id
            payer
            proposalKey
            transactionResult
            block {
                height
                timestamp
            }
        }
    }
`

export const TRANSACTION_BY_ID = gql`
    query Transaction($id: String) {
        transaction(where: {id: {_eq: $id}}, limit: 1) {
            id
            arguments
            authorizers
            gasLimit
            envelopeSignatures
            payer
            payloadSignatures
            proposalKey
            script
            transactionResult
            expiryBlock {
                height
                timestamp
            }
            block {
                height
                timestamp
            }
        }
    }
`
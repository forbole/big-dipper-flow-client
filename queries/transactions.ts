import { gql } from "@apollo/client";

export const TRANSACTIONS_LIST = gql`
    query TransactionsList($limit: Int = 10, $offset: Int = 0, $order: [transaction_order_by!] = {height: desc_nulls_last}) {
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

export const TRANSACTIONS_LIST_BY_ACCOUNT = gql`
    query TransactionsList($limit: Int = 10, $offset: Int = 0, $order: [transaction_order_by!] = {height: desc_nulls_last}, $proposalKey: jsonb) {
        transaction(limit: 10, order_by: $order, offset: $offset, where: {proposalKey: {_contains: $proposalKey}}) {
            collectionId
            height
            id
            payer
            proposalKey
            transactionResult
            block {
                height
                timestamp
            }
          }
          transaction_aggregate(where: {proposalKey: {_contains: $proposalKey}}) {
            aggregate {
              count
            }
          }
    }
`

export const TRANSACTION_COUNT = gql`
    query TransactionCount {
        transaction_aggregate {
            aggregate {
                count
            }
        }
    }
`

export const TRANSACTION_COUNT_BY_ACCOUNT = gql`
    query TransactionCount($proposalKey: jsonb) {
        transaction_aggregate(where: {proposalKey: {_contains: $proposalKey}}) {
            aggregate {
              count
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
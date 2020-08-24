import { gql } from "@apollo/client";

export const TRANSACTIONS_LIST = gql`
    query TransactionsList($limit: Int = 10, $offset: Int = 0, $order: [transaction_order_by!] = {block: {height: desc}}) {
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
import { gql } from '@apollo/client';

export const BLOCKS_LIST = gql`
    query BlocksList ($limit: Int = 10, $offset: Int =0, $order: [block_order_by!] = {height: desc}) {
        block(limit: $limit, order_by: $order, offset: $offset) {
            blockTime
            height
            id
            timestamp
            transactions_aggregate {
                aggregate {
                    count(columns: id)
                }
            }
        }
    }

`  
import { gql } from '@apollo/client';

export const BLOCKS_LIST = gql`
    query BlocksList ($limit: Int = 10, $offset: Int = 0, $order: [block_order_by!] = {height: desc}) {
        block(limit: $limit, order_by: $order, offset: $offset) {
            blockTime
            height
            id
            timestamp
            collections {
                transactionIds
            }
        }
    }

` 
export const BLOCK_BY_HEIGHT = gql`
    query Block($height: Int) {
        block(where: {height: {_eq: $height}}) {
        id
        height
        parentId
        signatures
        timestamp
        collections {
            id
            transactionIds
        }
        collections_aggregate {
            aggregate {
                count(columns: id)
            }
        }
        collectionGuarantees
            blockTime
            blockSeals
        }
    }
`

export const BLOCK_BY_ID = gql`
    query Block($id: String) {
        block(where: {height: {_eq: $id}}) {
        id
        height
        parentId
        signatures
        timestamp
        collections {
            id
            transactionIds
        }
        collections_aggregate {
            aggregate {
                count(columns: id)
            }
        }
        collectionGuarantees
            blockTime
            blockSeals
        }
    }
`
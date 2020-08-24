import { gql } from '@apollo/client';

export const BLOCK_DETAILS = gql`
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
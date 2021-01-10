import { gql } from "@apollo/client";

export const TransactionsFragment = gql`
  fragment transactionFields on transactions {
    id
    amount
    merchantName
    merchantCategory
    createdTs
  }
`

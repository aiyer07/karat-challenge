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
export const TransactionAuthorizationsFragment = gql`
  fragment txAuthFields on transaction_authorizations {
    id
    amount
    merchantName
    merchantCategory
    createdTs
    isApproved
  }
`
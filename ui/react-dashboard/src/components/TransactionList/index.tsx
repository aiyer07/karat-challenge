import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import { useQuery, gql } from "@apollo/client";
import { TransactionAuthorizationsFragment } from "../../graphql/fragments";
import CardLoader from './../CardLoader'
import {Title} from './../Title'
interface TAProps {
  createdTs: string,
  amount: string,
  merchantName: string,
  merchantCategory: string,
  isApproved: boolean
}

const GET_TRANSACTIONS = gql`
  query GetTransactions($limit: Int!, $offset: Int!) {
    transactionAuthorizations(limit: $limit, offset: $offset, order_by: {createdTs: desc}) {
      ...txAuthFields
    }
  }
  ${TransactionAuthorizationsFragment}
  `;

const TRANSACTION_LIMIT: number = 10


const TransactionList = () => {
  
  // query transactions
  const { loading, data, fetchMore } = useQuery(GET_TRANSACTIONS, {
    variables: {
      limit: TRANSACTION_LIMIT,
      offset: 0
    }
  });

  if (loading) return (<CardLoader></CardLoader>)

  // destructure transactions out of data
  let { transactionAuthorizations } = data || { transactionAuthorizations: []}
  

  // returns a single row for a given index the list is in
  const row = ({index, style}: any) => {
    const ta: TAProps = transactionAuthorizations[index]
    return (
      <ListItem key={index} style={style}>
        <ListItemText primary={ta.createdTs} />
        <ListItemText primary={ta.merchantName} />
        <ListItemText primary={ta.isApproved ? 'Approved' : 'Declined'} />
        <ListItemText primary={ta.amount} />
      </ListItem>
    )
  }

  const isItemLoaded = (index: number) => {
    return index < transactionAuthorizations.length - 1
  };

  const loadMore = () => {
    return fetchMore({
      variables: {
        limit: TRANSACTION_LIMIT,
        offset: transactionAuthorizations.length
      }
    })
  }
  // virtualized list handler for handling large number of rows
  return (
    <React.Fragment>
      <Title>Transactions</Title>
       <AutoSizer>
         {
          ({height, width}) => (
            <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={transactionAuthorizations.length}
            loadMoreItems={loadMore}
            threshold={1}
          >
            {({ onItemsRendered, ref }) => (
              <FixedSizeList
              ref={ref}
              height={height - 30}
              width={width}
              onItemsRendered={onItemsRendered}
              itemSize={45}
              itemCount={transactionAuthorizations.length}>
                {row}
              </FixedSizeList>
            )}
            </InfiniteLoader>
          )
        }
      </AutoSizer>
      
  </React.Fragment>
  );
}

export default TransactionList
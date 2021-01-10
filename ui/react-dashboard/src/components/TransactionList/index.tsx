import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useQuery, gql } from "@apollo/client";
import { TransactionAuthorizationsFragment } from "../../graphql/fragments";
import CardLoader from './../CardLoader'
const renderRow = (props: any) => {
  const { index, style } = props;
  console.log(index)
  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Item ${index + 1}`} />
    </ListItem>
  );
}

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transaction_authorizations {
      ...txAuthFields
    }
  }
  ${TransactionAuthorizationsFragment}
  `;

const TransactionList = () => {
  
  const { loading, error, data } = useQuery(GET_TRANSACTIONS);
  if (loading) return (<CardLoader></CardLoader>)
  return (
    <AutoSizer>
      {
        ({height, width}) => (
          <FixedSizeList height={height} width={width} itemCount={1000} itemSize={35}>
            {renderRow}
          </FixedSizeList>
        )
      }
    </AutoSizer>
  );
}

export default TransactionList
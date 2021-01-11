import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useQuery, gql } from "@apollo/client";
import { TransactionAuthorizationsFragment } from "../../graphql/fragments";
import CardLoader from './../CardLoader'
import { makeStyles, Link, List } from "@material-ui/core";

interface TAProps {
  createdTs: string,
  amount: number,
  merchantName: string,
  merchantCategory: string,
  isApproved: boolean
}

const renderRow = (props: TAProps, rowNum: number) => {
console.log("🚀 ~ file: index.tsx ~ line 20 ~ renderRow ~ props", props)
  return (
    <ListItem button key={rowNum}>
      <ListItemText primary={props.createdTs} />
      <ListItemText primary={props.merchantName} />
      <ListItemText primary={props.isApproved ? 'Approved' : 'Declined'} />
      <ListItemText primary={props.amount} />
    </ListItem>
  );
}

const GET_TRANSACTIONS = gql`
  query GetTransactions($limit: Int!, $offset: Int!) {
    transactionAuthorizations(limit: $limit, offset: $offset) {
      ...txAuthFields
    }
  }
  ${TransactionAuthorizationsFragment}
  `;

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));


const TransactionList = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: {
      limit: 5,
      offset: 0
    }
  });
  if (loading) return (<CardLoader></CardLoader>)
  const { transactionAuthorizations } = data
  console.log("🚀 ~ file: index.tsx ~ line 58 ~ TransactionList ~ transactionAuthorizations", transactionAuthorizations)
  const showMore = (clickEvent: React.MouseEvent) => {
    clickEvent.preventDefault();
  }

  return (
    <React.Fragment>
      <List>
        {
          transactionAuthorizations.map((ta: any, i: number) => {
            console.log("🚀 ~ file: index.tsx ~ line 67 ~ transactionAuthorizations.map ~ ta", ta)
            return renderRow(ta, i)
          })
        }
      </List>
      <div className={classes.seeMore}>
      <Link color="primary" href="#" onClick={showMore}>
        See more transactions
      </Link>
    </div>
  </React.Fragment>
  );
}

export default TransactionList
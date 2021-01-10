import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useQuery, gql } from "@apollo/client";
import { TransactionAuthorizationsFragment } from "../../graphql/fragments";
import CardLoader from './../CardLoader'
import { makeStyles, Link } from "@material-ui/core";



const renderRow = (props: any) => {
  const { index, style } = props;
  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Item ${index + 1}`} />
      <ListItemText primary={`Item ${index + 1}`} />
      <ListItemText primary={`Item ${index + 1}`} />
      <ListItemText primary={`Item ${index + 1}`} />
    </ListItem>
  );
}

const GET_TRANSACTIONS = gql`
  query GetTransactions($limit: Int!, $offset: Int!) {
    transaction_authorizations(limit: $limit, offset: $offset) {
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
  console.log("🚀 ~ file: index.tsx ~ line 32 ~ TransactionList ~ data", data)
  if (loading) return (<CardLoader></CardLoader>)

  const showMore = (clickEvent: React.MouseEvent) => {
    clickEvent.preventDefault();
  }

  return (
    <React.Fragment>
      <AutoSizer>
        {
          ({height, width}) => (
            <FixedSizeList height={height} width={width} itemCount={10} itemSize={35}>
              {renderRow}
            </FixedSizeList>
          )
        }
      </AutoSizer>
      <div className={classes.seeMore}>
      <Link color="primary" href="#" onClick={showMore}>
        See more orders
      </Link>
    </div>
  </React.Fragment>
  );
}

export default TransactionList
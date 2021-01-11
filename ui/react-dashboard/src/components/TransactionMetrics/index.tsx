import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Title} from '../Title';
import { useQuery, gql } from "@apollo/client";
import { TransactionAggregationFragment } from "../../graphql/fragments";
import CardLoader from '../CardLoader';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const GET_TRANSACTION_METRICS = gql`
  query TransactionMetricQuery {
    cards {
      ...cardAggFields
    }
  }
  ${TransactionAggregationFragment}
`

const TransactionMetrics = () => {
  const classes = useStyles();

  const { loading, data } = useQuery(GET_TRANSACTION_METRICS);
  
  if (loading) return (<CardLoader></CardLoader>)

  const { cards } = data
  const {avgSpend, totalSpend} = cards[0]
  return (
    <>
    <Title>Metrics</Title>
      <Typography component="p" variant="h4">
        {totalSpend}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Total Spend
      </Typography>
      <Typography component="p" variant="h4">
        {avgSpend}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Average Spend
      </Typography>
    </>
  )
}
export default TransactionMetrics
import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Title} from '../Title';
import { useQuery, gql } from "@apollo/client";
import { TransactionAggregationFragment } from "../../graphql/fragments";
import CardLoader from '../CardLoader';
import {
  PieChart, Pie, Cell,
} from 'recharts';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  pieChart: {
    alignSelf: 'center',
    margin: '0 auto'
  }
});

const GET_TRANSACTION_METRICS = gql`
  query TransactionMetricQuery {
    cards {
      ...cardAggFields
    }
  }
  ${TransactionAggregationFragment}
`

const fakeD: any[] = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const TransactionCategoryChart = () => {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_TRANSACTION_METRICS);
  
  if (loading) return (<CardLoader></CardLoader>)

  const { cards } = data
  const {avgSpend, totalSpend} = cards[0]
  return (
    <>
    <Title>Category Analysis</Title>
    <PieChart width={250} height={270} className={classes.pieChart} >
        <Pie
          data={fakeD}
          cx={150}
          cy={80}
          innerRadius={70}
          outerRadius={85}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >

          {
            fakeD.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={COLORS[0]} />)
          }
        </Pie>
    </PieChart>
    </>
  )
}
export default TransactionCategoryChart
import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Title} from '../Title';
import { useQuery, gql } from "@apollo/client";
import { TransactionAggregationFragment } from "../../graphql/fragments";
import CardLoader from '../CardLoader';
import {
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

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

const fakeD: any[] = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 200 },
  { name: 'Group F', value: 200 },
  { name: 'Group G', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

const renderLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

const TransactionCategoryChart = () => {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_TRANSACTION_METRICS);
  
  if (loading) return (<CardLoader></CardLoader>)

  const { cards } = data
  const {avgSpend, totalSpend} = cards[0]
  return (
    <>
    <Title>Category Analysis</Title>
    <ResponsiveContainer>
    <PieChart>
        <Pie
          data={fakeD}
          label={renderLabel}
          labelLine={false}
          fill="#8884d8"
          dataKey="value"
        >

          {
            fakeD.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
    </PieChart>
    </ResponsiveContainer>
    </>
  )
}
export default TransactionCategoryChart
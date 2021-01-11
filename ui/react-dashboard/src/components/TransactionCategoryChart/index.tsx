import React from 'react';
import {Title} from '../Title';
import { useQuery, gql } from "@apollo/client";
import { TransactionAggregationFragment } from "../../graphql/fragments";
import CardLoader from '../CardLoader';
import {
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

const GET_TRANSACTION_METRICS = gql`
  query TransactionMetricQuery {
    cards {
      id
      transactionsByCategory {
        merchantCategory
        numTx
      }
    }
  }
  ${TransactionAggregationFragment}
`

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#651fff', '#f50057'];

const renderLabel = ({merchantCategory, percent}: any) => {
  return (
    `${(percent * 100).toFixed(0)}% ${merchantCategory}`
  );
}

const TransactionCategoryChart = () => {
  const { loading, data } = useQuery(GET_TRANSACTION_METRICS);
  
  if (loading) return (<CardLoader></CardLoader>)

  const { cards } = data
  const {transactionsByCategory} = cards[0]
  return (
    <>
    <Title>Category Analysis</Title>
    <ResponsiveContainer>
    <PieChart>
        <Pie
          data={transactionsByCategory}
          label={renderLabel}
          fill="#8884d8"
          dataKey="numTx"
        >

          {
            transactionsByCategory.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
    </PieChart>
    </ResponsiveContainer>
    </>
  )
}
export default TransactionCategoryChart
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import {TransactionsFragment} from './graphql/fragments'

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      ...transactionFields
    }
  }
  ${TransactionsFragment}
`;

function App() {
  
  const { loading, error, data } = useQuery(GET_TRANSACTIONS);
  console.log("🚀 ~ file: App.tsx ~ line 17 ~ App ~ data", data)

  if (loading) return <p>Loading...</p>;
  if (error){ console.log(error); return <p>Error :(</p>;}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

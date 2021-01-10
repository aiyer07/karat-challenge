import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {TransactionAuthorizationsFragment} from './graphql/fragments'
import clsx from 'clsx';
import { Paper, Container, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));


const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transaction_authorizations {
      ...txAuthFields
    }
  }
  ${TransactionAuthorizationsFragment}
`;

function App() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_TRANSACTIONS);
  console.log("🚀 ~ file: App.tsx ~ line 17 ~ App ~ data", data)
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  if (loading) return <p>Loading...</p>;
  if (error){ console.log(error); return <p>Error :(</p>;}

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            {/* <Chart /> */}
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            {/* <Deposits /> */}
          </Paper>
        </Grid>
        {/* Recent Transactions */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {/* <Transactions /> */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;

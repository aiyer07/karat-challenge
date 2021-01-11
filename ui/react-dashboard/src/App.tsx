import React from 'react';
import clsx from 'clsx';
import { Paper, Container, Grid, makeStyles } from '@material-ui/core';
import TransactionList from './components/TransactionList'
import TransactionMetrics from './components/TransactionMetrics'
import { Link, List } from "@material-ui/core";
import TransactionCategoryChart from './components/TransactionCategoryChart';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh'
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
    height: '50vh',
    display: 'flex',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 300,
  },
  seeMore: {
  },
}));


function App() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
          <TransactionCategoryChart></TransactionCategoryChart>
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <TransactionMetrics></TransactionMetrics>
          </Paper>
        </Grid>
        {/* Recent Transactions */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TransactionList></TransactionList>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;


import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  }),
);

const CardLoader = (props: any) => {
  const classes = useStyles();
return (
  <div className={classes.root}>
    <CircularProgress />
  </div>
  )
}

export default CardLoader
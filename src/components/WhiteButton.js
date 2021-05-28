import '../App.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    border: "2px solid white",
    borderRadius: "34px",
    color: 'white',
    fontFamily: "Montserrat",
    fontSize: "16px"
  },
});
export default function AquaButton(props) {
  const classes = useStyles();
  return <Button {...props} className={classes.root}>{props.children}</Button>
}

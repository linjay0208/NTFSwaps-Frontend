import '../App.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: '#FF7F00',
    border: 0,
    borderRadius: "34px",
    color: 'white',
    fontFamily: "Montserrat",
    fontSize: "18px",
    minWidth: "200px"
  },
});
export default function FilledWideButton(props) {
  const classes = useStyles();
  return <Button {...props} className={classes.root} variant="filled">{props.children}</Button>
}

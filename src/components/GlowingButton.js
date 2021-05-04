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
    boxShadow: "0px 0px 5px 1px #FF7F00",
    minWidth: "200px"
  },
});
export default function GlowingButton(props) {
  const classes = useStyles();
  return <Button {...props} className={classes.root} variant="filled">{props.children}</Button>
}

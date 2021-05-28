import "../App.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    border: "2px solid #FF7F00",
    borderRadius: "34px",
    color: "#FF7F00",
    fontFamily: "Montserrat",
    fontSize: "16px",
    textTransform: "none",
  },
});
export default function ClearButton(props) {
  const classes = useStyles();
  return (
    <Button {...props} className={classes.root}>
      {props.children}
    </Button>
  );
}

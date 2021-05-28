import "../App.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    background: "#FFFFFF",
    border: 0,
    borderRadius: "10px",
    color: "black",
    fontFamily: "Montserrat",
    fontSize: "16px",
    // minWidth: "200px",
    fontWeight: "500",
    textTransform: "none",
    padding: "5px 40px",
  },
});
export default function ClaimButton(props) {
  const classes = useStyles();
  return (
    <Button {...props} className={classes.root} variant="contained">
      {props.children}
    </Button>
  );
}

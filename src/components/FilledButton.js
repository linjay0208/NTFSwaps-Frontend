import "../App.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    background: "#FF7F00",
    border: 0,
    borderRadius: "34px",
    color: "white",
    fontFamily: "Montserrat",
    fontSize: "18px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "rgba(255, 127, 0, 0.8)",
    },
  },
});
export default function FilledButton(props) {
  const classes = useStyles();
  return (
    <Button {...props} className={classes.root} variant="contained">
      {props.children}
    </Button>
  );
}

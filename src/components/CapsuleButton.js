import "../App.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  clear: {
    border: "2px solid #FF7F00",
    borderRadius: "34px",
    color: "#FF7F00",
    fontFamily: "Montserrat",
    fontSize: "16px",
    textTransform: "none",
  },
  filled: {
    background: "#FF7F00",
    border: 0,
    borderRadius: "34px",
    color: "white",
    fontFamily: "Montserrat",
    fontSize: "18px",
    padding: "6.5px 8px",
    textTransform: "none",
  },
});
export default function CapsuleButton(props) {
  const classes = useStyles();
  return (
    <Button
      {...props}
      className={props.active ? classes.clear : classes.filled}
      classes={{ root: "capsuleButtonRoot" }}
      style={{
        borderRadius:
          props.position == "left" ? "34px 0px 0px 34px" : "0px 34px 34px 0px",
      }}
    >
      {props.children}
    </Button>
  );
}

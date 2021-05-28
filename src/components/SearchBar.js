import "../App.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  root: {
    background: "#1A1A1A",
    border: 0,
    borderRadius: "34px",
    color: "white",
    fontFamily: "Montserrat",
    minWidth: "300px",
    outline: "none",
  },
  input: {
    fontSize: "12px",
    color: "white",
    borderRadius: "34px",
    border: "1px solid #FF7F00",
    padding: "0px",
    outline: "none",
    "&& .MuiOutlinedInput-input": {
      padding: "10px 20px",
    },
    "&& .MuiOutlinedInput-input:focus": {
      outline: "none",
      border: "0px solid #FF7F00",
    },
    "&& .MuiOutlinedInput-notchedOutline": {
      border: "0px solid #FF7F00",
    },
  },
});

export default function SearchBar(props) {
  const classes = useStyles();

  return (
    <div
      style={{
        position: "relative",
        width: "max-content",
        marginLeft: "auto",
        marginRight: "calc(5% + 50px)",
      }}
    >
      <div
        style={{
          position: "absolute",
          border: "2px solid #FF7F00",
          width: "calc(100% + 30px)",
          height: "calc(100% - 4px)",
          borderRadius: "34px",
          background: "white",
        }}
      >
        <SearchIcon
          style={{
            width: "35px",
            height: "25px",
            fontWeight: "900",
            padding: "4px 1px",
          }}
        />
      </div>
      <TextField
        {...props}
        className={classes.root}
        id="outlined-basic"
        variant="outlined"
        InputProps={{ className: classes.input }}
        placeholder="Search..."
        onChange={(e) => props.handleChange(e)}
      />
    </div>
  );
}

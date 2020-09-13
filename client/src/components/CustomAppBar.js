import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function CustomAppBar(props) {
  const username = localStorage.getItem("username");
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            Read Count System
          </Link>
        </Typography>
        {username && <Typography>{`Logged in as "${username}"`}</Typography>}
        {props.btn}
      </Toolbar>
    </AppBar>
  );
}

import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function CustomAppBar(props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            Read Count System
          </Link>
        </Typography>
        {props.btn}
      </Toolbar>
    </AppBar>
  );
}

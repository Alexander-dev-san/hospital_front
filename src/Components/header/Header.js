import React from "react";
import "./Header.scss";
import logo from "./img/logo.png";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";

function Header(props) {
  return (
    <div className="Header">
      <AppBar className="Header-appBar">
        <Container fixed>
          <Toolbar>
            <img src={logo} alt="logo" />
            <Typography className="Header-logoText">{props.heading}</Typography>
            {props.children}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;

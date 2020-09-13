import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import ApiRequests from "../utils/ApiRequests";
import CustomAppBar from "../components/CustomAppBar";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  state = {
    username: "",
    password: "",
    section: "login",
  };

  handleLogin = async () => {
    let username = this.state.username;
    let password = this.state.password;
    if (!username || !password) {
      alert("Please enter the credentials!");
      return;
    }
    try {
      let data = await ApiRequests.post("/api/auth/login", {
        username: username,
        password: password,
      });

      // store token to localStorage
      localStorage.setItem("token", data.payload.token);
      localStorage.setItem("username", data.payload.username);

      this.props.history.push("/");
    } catch (error) {
      alert("Invalid credentials!");
    }
  };

  handleSignUp = async () => {
    let username = this.state.username;
    let password = this.state.password;
    if (!username || !password) {
      alert("Please enter the credentials!");
      return;
    }
    try {
      let data = await ApiRequests.post("/api/auth/signup", {
        username: username,
        password: password,
      });

      // store token to localStorage
      localStorage.setItem("token", data.payload.token);
      localStorage.setItem("username", data.payload.username);

      this.props.history.push("/");
    } catch (error) {
      console.log(error);
      alert("Username already registered!");
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CustomAppBar></CustomAppBar>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>

            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={this.state.username}
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={
                  this.state.section === "login"
                    ? this.handleLogin
                    : this.handleSignUp
                }
              >
                {this.state.section === "login" ? "Login" : "Sign Up"}
              </Button>
              <center>
                <Typography
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => {
                    this.setState({
                      section:
                        this.state.section === "login" ? "signup" : "login",
                    });
                  }}
                >
                  {this.state.section === "login"
                    ? "New User? Sign Up!"
                    : "Existing User? Login!"}
                </Typography>
              </center>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Login);

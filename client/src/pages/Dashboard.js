import React, { Component } from "react";
import ApiRequests from "../utils/ApiRequests";
import { CircularProgress, Typography, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import CustomAppBar from "../components/CustomAppBar";
import { ExitToApp } from "@material-ui/icons";

export default class Dashboard extends Component {
  state = {
    stories: [],
    isLoading: true,
  };

  componentDidMount() {
    this.fetchStoriesList();
  }

  fetchStoriesList = async () => {
    try {
      let data = await ApiRequests.get("/api/stories/");
      this.setState({
        stories: data.payload,
        isLoading: false,
      });
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  render() {
    if (this.state.isLoading)
      return (
        <center>
          <CircularProgress></CircularProgress>
        </center>
      );

    return (
      <div>
        <CustomAppBar
          btn={
            <IconButton
              color="inherit"
              onClick={() => {
                localStorage.removeItem("token");
                this.props.history.push("/");
              }}
            >
              <ExitToApp />
            </IconButton>
          }
        ></CustomAppBar>
        <center>
          <h2>Stories</h2>
          <hr />
          {this.state.stories.map((e) => (
            <p key={e._id}>
              <Link to={`/stories/${e._id}`}>
                <Typography>{e.title}</Typography>
              </Link>
            </p>
          ))}
        </center>
      </div>
    );
  }
}

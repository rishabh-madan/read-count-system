import React, { Component } from "react";
import io from "socket.io-client";
import ApiRequests from "../utils/ApiRequests";
import { CircularProgress, Typography, IconButton } from "@material-ui/core";
import CustomAppBar from "../components/CustomAppBar";
import { ExitToApp } from "@material-ui/icons";

export default class Story extends Component {
  state = {
    storyDetails: {},
    currentReaderCount: 0,
    isLoading: true,
  };

  socketUrl =
    process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/";

  socket = io(this.socketUrl);

  componentDidMount() {
    const storyId = this.props.match.params.id;
    const username = localStorage.getItem("username");

    this.socket.on("connect", () => {
      this.socket.emit("readerJoined", { username, storyId });
    });

    this.socket.on("readerCountUpdate", ({ count }) => {
      this.setState({ currentReaderCount: count });
    });

    this.fetchStoryDetails();
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  fetchStoryDetails = async () => {
    const storyId = this.props.match.params.id;
    try {
      let data = await ApiRequests.get(`/api/stories/${storyId}`);
      this.setState({
        storyDetails: data.payload,
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
    const { storyDetails, currentReaderCount } = this.state;
    return (
      <div>
        <CustomAppBar
          btn={
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
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
          <h2>{storyDetails.title}</h2>
          <hr />
          <Typography>{`Current Reader Count: ${currentReaderCount}`}</Typography>
          <Typography>{`Total Reader Count: ${storyDetails.totalReaderCount}`}</Typography>
          <hr />
          <Typography>{storyDetails.content}</Typography>
        </center>
      </div>
    );
  }
}

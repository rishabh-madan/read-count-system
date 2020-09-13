import React from "react";
import io from "socket.io-client";

function App() {
  var socket = io("http://localhost:5000");
  var storyId = window.location.pathname.substr(1);

  socket.on("connect", function () {
    socket.emit("readerJoined", { storyId: storyId });
  });

  socket.on("readerCountUpdate", ({ count }) => {
    console.log(count);
  });

  return <div className="App">Client App</div>;
}

export default App;

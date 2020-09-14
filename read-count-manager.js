const { server } = require("./server.js");
// socket init
const io = require("socket.io")(server);

// holds active socket connections
const readers = [];

// returns reader count for specific story
const getReaderCount = (storyId) => {
  return new Set(
    readers.filter((reader) => reader.storyId == storyId).map((e) => e.username)
  ).size;
};

io.on("connection", (socket) => {
  // triggered when a new reader joins
  socket.on("readerJoined", ({ username, storyId }) => {
    // readers list is updated
    readers.push({ id: socket.id, username, storyId });

    // joins the room based on storyId
    socket.join(storyId);

    // broadcast message to all readers in that room (for count update)
    io.to(storyId).emit("readerCountUpdate", {
      count: getReaderCount(storyId),
    });
  });

  // removes reader from readers list
  socket.on("disconnect", () => {
    let user = null;
    const index = readers.findIndex((user) => user.id == socket.id);

    if (index >= 0) user = readers.splice(index, 1)[0];

    // broadcast message to all readers in that room (for count update)
    if (user)
      io.to(user.storyId).emit("readerCountUpdate", {
        count: getReaderCount(user.storyId),
      });
  });
});

// setInterval(() => {
//   console.log(readers);
// }, 2000);

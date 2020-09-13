const { server } = require("./server.js");
// socket init
const io = require("socket.io")(server);

const readers = [];

const getReaderCount = (storyId) => {
  return new Set(
    readers.filter((reader) => reader.storyId == storyId).map((e) => e.username)
  ).size;
};

io.on("connection", (socket) => {
  socket.on("readerJoined", ({ username, storyId }) => {
    readers.push({ id: socket.id, username, storyId });

    socket.join(storyId);

    io.to(storyId).emit("readerCountUpdate", {
      count: getReaderCount(storyId),
    });
  });

  socket.on("disconnect", () => {
    let user = null;
    const index = readers.findIndex((user) => user.id == socket.id);

    if (index >= 0) user = readers.splice(index, 1)[0];
    if (user)
      io.to(user.storyId).emit("readerCountUpdate", {
        count: getReaderCount(user.storyId),
      });
  });
});

// setInterval(() => {
//   console.log(readers);
// }, 2000);

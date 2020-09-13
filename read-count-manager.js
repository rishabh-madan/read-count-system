const { server } = require("./server.js");
// socket init
const io = require("socket.io")(server);

const readers = [];

const getReaderCount = (storyId) => {
  return readers.filter((reader) => reader.storyId == storyId).length;
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

    user = readers.splice(index, 1)[0];
    io.to(user.storyId).emit("readerCountUpdate", {
      count: getReaderCount(user.storyId),
    });
  });
});

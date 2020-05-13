const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const RpsGame = require("./rps-game");

const PORT = 8080;
const CLIENT_PATH = `${__dirname}/../client`;
console.log(`Serving static from ${CLIENT_PATH}`);

const app = express();
app.use(express.static(CLIENT_PATH));

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

io.on("connection", (sock) => {
    if (waitingPlayer) {
        new RpsGame(waitingPlayer, sock);
        waitingPlayer = null;
    } else {
        waitingPlayer = sock;
        waitingPlayer.emit("message", "Waiting for an opponent");
    }
    console.log("Someone connected");

    sock.on("message", (text) => {
        io.emit("message", text);
    });
});

server.on("error", (err) => {
    console.error(`Server error: ${err}`);
});

server.listen(PORT, () => {
    console.log(`RPS started on ${PORT}`);
});

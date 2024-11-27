const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "../public")));

let messages = [];

io.on("connection", (socket) => {
    console.log("A user connected.");

    socket.on("join", ({ username, color }) => {
        socket.username = username;
        socket.color = color;
        io.emit("message", {
            username: "System",
            text: `${username} joined the chat.`,
            color: "#000",
        });
    });

    socket.on("message", (data) => {
        const msg = {
            username: socket.username,
            text: data.text,
            color: socket.color,
            index: messages.length + 1,
        };
        messages.push(msg);
        io.emit("message", msg);
    });

    socket.on("disconnect", () => {
        io.emit("message", {
            username: "System",
            text: `${socket.username} left the chat.`,
            color: "#000",
        });
    });
});

server.listen(3000, () => {
    console.log("Server is running on port 3000.");
});

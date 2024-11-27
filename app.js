const startChatBtn = document.getElementById("start-chat");
const chatRoom = document.getElementById("chat-room");
const intro = document.getElementById("intro");
const usernameInput = document.getElementById("username");
const colorPicker = document.getElementById("color-picker");
const messageBox = document.getElementById("message-box");
const canvas = document.getElementById("chat-canvas");
const ctx = canvas.getContext("2d");

// Socket connection
const socket = io(); // Ensure to link the backend server

// Start Chat
startChatBtn.addEventListener("click", () => {
    const username = usernameInput.value || `User${Math.floor(Math.random() * 1000)}`;
    const color = colorPicker.value;

    socket.emit("join", { username, color });
    intro.style.display = "none";
    chatRoom.style.display = "block";
});

// Sending Messages
document.getElementById("send-message").addEventListener("click", () => {
    const message = messageBox.value.trim();
    if (message) {
        socket.emit("message", { text: message });
        messageBox.value = "";
    }
});

// Receiving Messages
socket.on("message", (data) => {
    ctx.font = "14px Arial";
    ctx.fillStyle = data.color;
    ctx.fillText(`${data.username}: ${data.text}`, 10, 20 * (data.index || 1));
});

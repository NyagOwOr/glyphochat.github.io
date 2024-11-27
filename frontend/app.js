const socket = io(); // Connect to the backend

const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');

let drawing = false;

// Drawing functionality
canvas.addEventListener('mousedown', () => (drawing = true));
canvas.addEventListener('mouseup', () => (drawing = false));
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    socket.emit('draw', { x, y });
});

socket.on('draw', ({ x, y }) => {
    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, 2, 2);
});

// Chat functionality
sendButton.addEventListener('click', () => {
    const message = chatInput.value;
    if (!message) return;
    socket.emit('message', message);
    chatInput.value = '';
});

socket.on('message', (message) => {
    chatBox.value += `${message}\n`;
    chatBox.scrollTop = chatBox.scrollHeight;
});

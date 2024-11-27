let username = '';
let messages = [];

function startChat() {
    username = document.getElementById('username').value.trim();
    if (username === '') {
        alert('Please enter a valid username');
        return;
    }

    document.getElementById('intro').style.display = 'none';
    document.getElementById('chat-room').style.display = 'block';

    updateMessages();
}

function updateMessages() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';  // Clear the current messages

    messages.forEach(msg => {
        const msgElement = document.createElement('div');
        msgElement.textContent = `${msg.user}: ${msg.text}`;
        messagesContainer.appendChild(msgElement);
    });

    // Scroll to the bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    const messageText = document.getElementById('message').value.trim();
    if (messageText === '') return;

    messages.push({ user: username, text: messageText });
    document.getElementById('message').value = '';  // Clear the input

    updateMessages();
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

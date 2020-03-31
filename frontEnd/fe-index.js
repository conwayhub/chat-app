const chatForm = document.getElementById('chat-form');
const socket = io();

const { username } = Qs.parse(location.search, { ignoreQueryPrefix: true });
socket.emit('join', { username });

socket.on('message', message => {
  outputMessage(message);
});

chatForm.addEventListener('submit', e => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  socket.emit('chatMessage', msg);
});

function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p>${message.time}</p><p class=text><span>${message.username}:</span>${message.message}</p>`;
  document.querySelector('.chat-messages-output').appendChild(div);
}

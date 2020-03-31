const chatForm = document.getElementById("chat-form");
const socket = io();

let inputtedName = null;

if (window.location.href.indexOf("?") == -1) {
  inputtedName = prompt("Username:", "anonymous");
}

if (inputtedName != null) {
  let newURL = location.href + `?username=${inputtedName}`;
  location.assign(newURL);
}

const { username } = Qs.parse(location.search, { ignoreQueryPrefix: true });
socket.emit("join", { username });

socket.on("message", message => {
  outputMessage(message);
});

chatForm.addEventListener("submit", e => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  socket.emit("chatMessage", msg);
});

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p>${message.time}</p><p class=text><span>${message.username}:</span>${message.message}</p>`;
  document.querySelector(".chat-messages-output").appendChild(div);
}

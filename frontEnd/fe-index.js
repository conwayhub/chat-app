const chatForm = document.getElementById("chat-form");
const socket = io();

//message from server
socket.on("message", message => {
  console.log(message);
  outputMessage(message);
});

//message submit
chatForm.addEventListener("submit", e => {
  e.preventDefault();

  //gets message text
  const msg = e.target.elements.msg.value;

  //sends message to server
  socket.emit("chatMessage", msg);
});

//output message to page
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class=text>${message}</p>`;
  document.querySelector(".chat-messages-output").appendChild(div);
}

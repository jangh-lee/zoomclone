//app.js는 클라이언트 브라우저에 관한 내용이다.

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");


// 여기의 socket은 백엔드와 연결된 소켓이다
const socket = new WebSocket(`ws://${window.location.host}`);

//서버에서 보내주는 socket메시지를 event로 받을 수 있다.
socket.addEventListener("open", () => {
    console.log("connection to Server");
})

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li, window.location.host);
})

socket.addEventListener("close", () => {
    console.log("connection XXXXX" )
})

setTimeout(()=> {
    socket.send("10000wait")
}, 10000)


messageForm.addEventListener("submit", (event) => { 
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
});
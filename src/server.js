import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();
const port = 3000;


// pug로 view engine 할당
app.set("view engine", "pug");

//express 템플릿지정
app.set("views", __dirname + "/views");

// public url 지정, FrontEnd를 담당하는 폴더
app.use("/public", express.static(__dirname + "/public"));

// home.pug를 render해주는 route handler를 만들었음
app.get("/", (req, res) => res.render("home"));

//catchall로 url을 어떤것을 쓰든 전부 /로 리다이렉트
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("we are starting express web on http://172.16.0.44:"+port)

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 사용자를 구분하기 위한 fake db 생성
const sockets = [];

// 여기의 socket은 연결된 브라우저이다.
// socket도 보내는 method가 존재한다.
wss.on("connection", (socket) => {
    sockets.push(socket);
    console.log("connection!");
    socket.on("close", ()=> console.log("Disconnection"));
    socket.on("message", (message) => {
        sockets.forEach(aSocket => aSocket.send(message.toString('ascii')));
        console.log(message.toString('ascii'))
    })
    socket.send("hello! friends!");
})


server.listen(port, handleListen);
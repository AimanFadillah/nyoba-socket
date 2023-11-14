import express from "express"
import {createServer} from "http"
import {Server} from "socket.io"

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/",(req,res) => {
    return res.sendFile("C:/project/socket/index.html");
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(5000,() => console.log("Nyala"))

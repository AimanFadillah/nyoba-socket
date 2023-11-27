import express from "express"
import {createServer} from "http"
import {Server} from "socket.io"
import Route from "./route.js"; 
import Pesan from "./models/Pesan.js";

const app = express();
const server = createServer(app);
const io = new Server(server);


app.set("view engine","ejs");
app.use(express.static("public"));
app.use(Route);

io.on('connection', (socket) => {
    socket.on("pesanan",async (data) => io.emit("pesanan",await Pesan.create(data)))
    socket.on("hapusPesanan",(id) => {
        Pesan.destroy({where:{id}});
        io.emit("hapusPesanan",id);
    })
    socket.on("editPesanan",(data,id) => {
        Pesan.update(data,{where:{id:id}});
        io.emit("editPesanan",data,id);
    })
});

server.listen(5000,() => console.log("http://localhost:5000")) 

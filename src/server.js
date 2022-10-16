const express = require("express");
const app = express();
let mensajes = [];
// Esta variable lo que hace es buscar un puerto disponible, y si no hay ninguno , ejecutarlo en el puerto 8080
const PORT = process.env.PORT || 8080;
const {Server} = require("socket.io");

const server = app.listen(PORT,()=> console.log(`Listening on port: ${PORT}`));

const io = new Server(server);

app.use(express.static(__dirname+"/public"))



io.on("connection",(socket)=>{
    const {id } = socket
    console.log(`Connected to ${id}`)
    socket.on("message",(data)=>{
        
        mensajes.push(data);
        io.sockets.emit("historico",mensajes)
    })
})
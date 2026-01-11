import {Server} from "socket.io"
import http from "http"

let io : Server;

export const initSocket = (server :http.Server)=>{
    io = new Server(server , {
        cors:{
            origin : process.env.CLIENT_URL,
            credentials:true,
        }
    });

    io.on("connection" , (socket)=>{
        socket.on("join" , (userId : string)=>{
            socket.join(userId);
        })
    })
}

export const getIO =() : Server =>{
    if(!io) throw new Error("Socket not initialized")
    return io;
}
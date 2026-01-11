import { Server } from "socket.io";
let io;
export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true,
        }
    });
    io.on("connection", (socket) => {
        socket.on("join", (userId) => {
            socket.join(userId);
        });
    });
};
export const getIO = () => {
    if (!io)
        throw new Error("Socket not initialized");
    return io;
};

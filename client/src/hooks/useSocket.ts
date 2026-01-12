// src/hooks/useSocket.ts
import { io, Socket } from "socket.io-client";
import { useEffect } from "react";

export const useSocket = (userId?: string) => {
  useEffect(() => {
    if (!userId) return;

    const socket: Socket = io("http://localhost:5000", {
      withCredentials: true,
    });

    socket.emit("join", userId);

    socket.on("hired", (data) => {
      alert(`🎉 You got hired for: ${data.gigTitle}`);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);
};

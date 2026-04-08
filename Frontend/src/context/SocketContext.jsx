import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const BACKEND_URL =
  import.meta.env.VITE_BASE_URL || "https://kuber-backend-d06w.onrender.com";

const socket = io(BACKEND_URL, {
  transports: ["polling", "websocket"],
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log("Socket connection error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

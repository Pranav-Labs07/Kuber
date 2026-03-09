import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const socket = io("https://kuber.up.railway.app", {
  transports: ["websocket"]
});

const SocketProvider = ({ children }) => {

  useEffect(() => {

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

 // // Send message to a specific event
  // const sendMessage = (eventName, data) => {
  //   if (socketRef.current) {
  //     socketRef.current.emit(eventName, data);
  //   }
  //   console.log(`sending Messsage: ${data} to ${eventName}`);
  // };

  // // Listen for a specific event
  // const onMessage = (eventName, callback) => {
  //   if (socketRef.current) {
  //     socketRef.current.on(eventName, callback);
  //   }
  //   // Optionally return an unsubscribe function
  //   return () => {
  //     if (socketRef.current) {
  //       socketRef.current.off(eventName, callback);
  //     }
  //   };
  // };


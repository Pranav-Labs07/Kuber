import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
    });
    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socketInstance.disconnect();
    };
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


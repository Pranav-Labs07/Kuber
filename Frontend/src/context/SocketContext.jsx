import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";

const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Only create socket once
    if (socketRef.current) return;

    const socketInstance = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socketInstance;

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
    });
    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
    });
    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
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


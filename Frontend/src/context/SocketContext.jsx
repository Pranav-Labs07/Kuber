import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`); // Replace with your server URL

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Basic connection logic
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
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


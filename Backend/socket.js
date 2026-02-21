const socketIo = require('socket.io');
const userModel = require('./models/user.model')
const captainModel = require('./models/captain.model')
let io;
function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('join', async (data) => {
      const { userId, userType } = data;
      if (userType === 'captain') {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === 'user') {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on('update-location-captain', async (data) => {
      const { userId, userType, location } = data;
      // Validate location
      if (!location || typeof location !== 'object' || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
        socket.emit('error', { message: 'Invalid location data.' });
        return;
      }
      await captainModel.findByIdAndUpdate(userId, {
        location: {
          lat: location.lat,
          lng: location.lng
        }
      });

    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}
const sendMessageToSocketId = (socketId, messageObject) => {
  console.log(`Sending message to ${socketId}, messageObject`, messageObject)
  if (io) {
    // Use the event name from messageObject.event and send messageObject.data
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log('Socket.io not initialized.');
  }
}
module.exports = { initializeSocket, sendMessageToSocketId };
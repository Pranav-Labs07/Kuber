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

      try {
        // ✅ FIX: Add error handling and logging
        console.log(`[v0] Join event received - userId: ${userId}, userType: ${userType}, socketId: ${socket.id}`);

        if (userType === 'user') {
          const updatedUser = await userModel.findByIdAndUpdate(userId, { socketId: socket.id }, { new: true });
          console.log(`[v0] User socketId updated:`, updatedUser?.socketId);
        } else if (userType === 'captain') {
          const updatedCaptain = await captainModel.findByIdAndUpdate(userId, { socketId: socket.id }, { new: true });
          console.log(`[v0] Captain socketId updated:`, updatedCaptain?.socketId);
        }
      } catch (err) {
        console.error(`[v0] Error in join event:`, err);
      }
    });

    socket.on('update-location-captain', async (data) => {
      const { userId, location } = data;
      if (!location || typeof location !== 'object' || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
        socket.emit('error', { message: 'Invalid location data.' });
        return;
      }
      try {
        await captainModel.findByIdAndUpdate(userId, {
          location: {
            type: 'Point',
            coordinates: [location.lng, location.lat]
          }
        });
      } catch (err) {
        console.error(`[v0] Error updating location for captain ${userId}:`, err);
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

// ✅ FIX: Add null checks and detailed logging
const sendMessageToSocketId = (socketId, messageObject) => {
  console.log(`[v0] Attempting to send message to socketId: ${socketId}`, messageObject);

  if (!socketId) {
    console.error('[v0] ERROR: socketId is null/undefined - message not sent', messageObject);
    return false;
  }

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
    console.log(`[v0] Message sent successfully to socketId: ${socketId}, event: ${messageObject.event}`);
    return true;
  } else {
    console.error('[v0] Socket.io not initialized.');
    return false;
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
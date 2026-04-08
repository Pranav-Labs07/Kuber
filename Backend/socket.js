const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {

    io = socketIo(server, {
        cors: {

            origin: "*",
            methods: ["GET", "POST"],
            credentials: true
        },

        transports: ["polling", "websocket"],
        allowEIO3: true
    });

    io.on("connection", (socket) => {

        console.log("Client connected:", socket.id);

        socket.on("join", async (data) => {

            console.log("📥 JOIN EVENT:", data);

            const { userId, userType } = data;

            if (!userId || !userType) {
                console.log(" Invalid join payload");
                return;
            }

            try {

                if (userType === "user") {

                    await userModel.findByIdAndUpdate(userId, {
                        socketId: socket.id
                    });

                    console.log(" User socket saved:", socket.id);

                } else if (userType === "captain") {

                    await captainModel.findByIdAndUpdate(userId, {
                        socketId: socket.id
                    });

                    console.log(" Captain socket saved:", socket.id);

                }

            } catch (err) {
                console.log(" Join error:", err.message);
            }

        });

        socket.on("update-location-captain", async (data) => {

            console.log(" Location update:", data);

            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit("error", { message: "Invalid location data" });
            }

            try {

                await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        type: "Point",
                        coordinates: [location.lng, location.ltd]
                    }
                });

            } catch (err) {
                console.log(" Location update error:", err.message);
            }

        });

        socket.on("disconnect", () => {
            console.log(" Client disconnected:", socket.id);
        });

    });

}

const sendMessageToSocketId = (socketId, messageObject) => {

    console.log(" Sending socket event:", messageObject.event);
    console.log(" Target socketId:", socketId);

    if (!io) {
        console.log(" Socket.io not initialized.");
        return;
    }

    if (!socketId) {
        console.log(" No socketId provided — captain may not have joined yet");
        return;
    }

    io.to(socketId).emit(messageObject.event, messageObject.data);
    console.log("Event emitted successfully");
};

module.exports = { initializeSocket, sendMessageToSocketId };

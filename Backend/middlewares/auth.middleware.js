const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackllistToken.model');
const captainModel = require('../models/captain.model');


module.exports.authUser = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;
        const cookieToken = req.cookies?.token;

        console.log("Auth Header:", authHeader);
        console.log("Cookie Token:", cookieToken);

        const token = cookieToken || authHeader?.split(' ')[1];

        if (!token) {
            console.log("❌ No token received");
            return res.status(401).json({ message: 'Unauthorized - No token' });
        }

        const isBlacklisted = await blackListTokenModel.findOne({ token });

        if (isBlacklisted) {
            console.log("❌ Token is blacklisted");
            return res.status(401).json({ message: 'Unauthorized - Blacklisted token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded Token:", decoded);

        const user = await userModel.findById(decoded._id);

        if (!user) {
            console.log("❌ User not found:", decoded._id);
            return res.status(401).json({ message: 'Unauthorized - User not found' });
        }

        req.user = user;

        next();

    } catch (err) {

        console.log("❌ JWT Error:", err.message);
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });

    }

};


module.exports.authCaptain = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;
        const cookieToken = req.cookies?.token;

        console.log("Auth Header:", authHeader);
        console.log("Cookie Token:", cookieToken);

        const token = cookieToken || authHeader?.split(' ')[1];

        if (!token) {
            console.log("❌ No token received");
            return res.status(401).json({ message: 'Unauthorized - No token' });
        }

        const isBlacklisted = await blackListTokenModel.findOne({ token });

        if (isBlacklisted) {
            console.log("❌ Token is blacklisted");
            return res.status(401).json({ message: 'Unauthorized - Blacklisted token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded Token:", decoded);

        const captain = await captainModel.findById(decoded._id);

        if (!captain) {
            console.log("❌ Captain not found:", decoded._id);
            return res.status(401).json({ message: 'Unauthorized - Captain not found' });
        }

        req.captain = captain;

        next();

    } catch (err) {

        console.log("❌ JWT Error:", err.message);
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });

    }

};
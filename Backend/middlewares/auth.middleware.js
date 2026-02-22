const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackllistToken.model');
const captainModel = require('../models/captain.model');


module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  console.log('authUser: Checking token:', token);
  
  if (!token) {
    console.log('authUser: No token provided');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const isBlackListed = await blackListTokenModel.findOne({ token: token });
  if (isBlackListed) {
    console.log('authUser: Token is blacklisted');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded._id);
    if (!user) {
<<<<<<< HEAD

      console.error('authUser: User not found in database for token user ID:', decoded._id);
      return res.status(401).json({ message: 'User not found' });

      return res.status(401).json({ message: 'Unauthorized' });

=======
<<<<<<< HEAD
      console.error('authUser: User not found in database for token user ID:', decoded._id);
      return res.status(401).json({ message: 'User not found' });
=======
      return res.status(401).json({ message: 'Unauthorized' });
>>>>>>> 2089b0ac1a2fd268299f0f576743ae495ea0f95b
>>>>>>> 33ee698d3b304cec4a27a7511be235cee2f8c5ca
    }
    req.user = user;
    return next();
  } catch (err) {
    console.error('authUser: Auth error parsing/verifying token:', err.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const isBlacklisted = await blackListTokenModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.captain = captain;
    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
const mapService = require('../services/maps.service')
const { validationResult } = require('express-validator');
const rideService = require('../services/ride.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');


module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination, vehicleType } = req.body;
  try {
    // Step 1: create the ride
    const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });

    // Step 2: get pickup coordinates (for finding nearby captains)
    let pickupCoordinates;
    try {
      pickupCoordinates = await mapService.getAddressCoordinate(pickup);
      console.log('Pickup coords:', pickupCoordinates);
    } catch (geoErr) {
      console.error('Could not geocode pickup (non-fatal):', geoErr.message);
    }

    // Step 3: notify nearby captains via socket
    if (pickupCoordinates) {
      const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 2);
      const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
      captainsInRadius.forEach(captain => {
        sendMessageToSocketId(captain.socketId, {
          event: 'new-ride',
          data: rideWithUser
        });
      });
    }

    // Step 4: respond to client
    return res.status(201).json(ride);

  } catch (err) {
    console.error('createRide error:', err);
    return res.status(500).json({ message: err.message });
  }
}

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;
  console.log('Received pickup:', pickup, 'destination:', destination);
  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (err) {
    console.error('Error in getFare:', err);
    return res.status(500).json({ message: err.message })

  }

}

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await rideService.confirmRide({ rideId, captain: req.captain });
    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-confirmed',
      data: ride
    })

    return res.status(200).json(ride);
  } catch (err) {

    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

// module.exports.startRide = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { rideId, otp } = req.query;

//     try {
//         const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

//         console.log(ride);

//         sendMessageToSocketId(ride.user.socketId, {
//             event: 'ride-started',
//             data: ride
//         })

//         return res.status(200).json(ride);
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// }

// module.exports.endRide = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { rideId } = req.body;

//     try {
//         const ride = await rideService.endRide({ rideId, captain: req.captain });

//         sendMessageToSocketId(ride.user.socketId, {
//             event: 'ride-ended',
//             data: ride
//         })



//         return res.status(200).json(ride);
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     } s
// }

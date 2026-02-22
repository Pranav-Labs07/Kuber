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
<<<<<<< HEAD

  if (!req.user) {
    console.error('req.user is null/undefined in createRide');
    return res.status(401).json({ message: 'User not authenticated. Please log in again.' });
  }

  const { pickup, destination, vehicleType } = req.body;
  console.log('createRide called with:', { pickup, destination, vehicleType, userId: req.user._id });
=======
  const { pickup, destination, vehicleType } = req.body;
>>>>>>> 2089b0ac1a2fd268299f0f576743ae495ea0f95b
  try {
    // Step 1: create the ride
    const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
<<<<<<< HEAD
    console.log('Ride created:', ride);
    res.status(201).json(ride);

    try {
      const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
      console.log('Pickup coordinates resolved:', pickupCoordinates);

      const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 2);
      console.log(`Found ${captainsInRadius.length} captains in radius.`);

      const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

      captainsInRadius.forEach(captain => {
        console.log(`Emitting new-ride to captain ${captain._id}, socketId: ${captain.socketId}`);
        sendMessageToSocketId(captain.socketId, {
          event: 'new-ride',
          data: rideWithUser
        });
      });
    } catch (mapError) {
      console.error('Error fetching captains:', mapError.message);
      // Don't fail ride creation if we can't find captains
    }
  } catch (err) {
    console.error('Error in createRide:', err);
=======

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
>>>>>>> 2089b0ac1a2fd268299f0f576743ae495ea0f95b
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
    return res.status(500).json({ message: err.message });
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
<<<<<<< HEAD
    // Emit to user
    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-confirmed',
      data: ride
    });
    // Emit to captain
    if (ride.captain && ride.captain.socketId) {
      sendMessageToSocketId(ride.captain.socketId, {
        event: 'ride-confirmed',
        data: ride
      });
    }
    return res.status(200).json(ride);
  } catch (err) {

=======
    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-confirmed',
      data: ride
    })

    return res.status(200).json(ride);
  } catch (err) {

>>>>>>> 2089b0ac1a2fd268299f0f576743ae495ea0f95b
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

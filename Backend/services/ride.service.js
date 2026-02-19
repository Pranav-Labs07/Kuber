const crypto = require('crypto');
const rideModel = require('../models/ride.model');
const mapService =require("./maps.service")

async function getFare(pickup,destination){
  if(!pickup || !destination){
    throw new Error("pickup and destination are required");
  }
  const distanceTime = await mapService.getDistanceTime(pickup,destination);
  const baseFare = { auto: 10, car: 20, moto: 5 };
  const perKmRate = { auto: 10, car: 15, moto: 8 };
  const perMinRate = { auto: 1, car: 2, moto: 0.5 };
  console.log(distanceTime);

  // Ensure distance is in kilometers
  const distanceInKm = distanceTime.distance / 1000;
  const durationInMin = distanceTime.duration / 60;
  // Calculate hours and minutes
  const durationHours = Math.floor(durationInMin / 60);
  const durationMinutes = Math.round(durationInMin % 60);
  const fare = {
    auto: Math.round((baseFare.auto + distanceInKm * perKmRate.auto + durationInMin * perMinRate.auto) * 100) / 100,
    car: Math.round((baseFare.car + distanceInKm * perKmRate.car + durationInMin * perMinRate.car) * 100) / 100,
    moto: Math.round((baseFare.moto + distanceInKm * perKmRate.moto + durationInMin * perMinRate.moto) * 100) / 100,
    distance: `${distanceInKm.toFixed(2)} km`,
    duration: durationHours > 0 ? `${durationHours} hr ${durationMinutes} min` : `${durationMinutes} min`
  };
  return fare;


  }

  module.exports.getFare = getFare;

function getOtp(num) {
  function generateOtp(num) {
    const min = Math.pow(10, num - 1);
    const max = Math.pow(10, num) - 1;
    // Try using crypto.randomInt if available
    if (crypto.randomInt) {
      return crypto.randomInt(min, max + 1).toString();
    } else {
      // Fallback to Math.random if crypto.randomInt is not available
      const otp = Math.floor(Math.random() * (max - min + 1)) + min;
      return otp.toString();
    }
  }
  return generateOtp(num);
}

module.exports.createRide =async({
  user,pickup,destination,vehicleType
  }) =>{
  if(!user || !pickup || !destination || !vehicleType){
    throw new Error('All fields are required');
  }
  const fare = await getFare(pickup,destination);
  console.log(fare)
  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp:getOtp(6),
    fare:fare[vehicleType]
  })
  return ride;
  
}

module.exports.confirmRide = async ({ rideId }) => {
  if (!rideId) {
    throw new Error('Ride id is Required');
  }
  await rideModel.findOneAndUpdate({
    _id: rideId
  }, {
    status: 'accepted',
    captain: 'captain._id'
  })
  const ride = await rideModel.findOne({
    _id: ride
  }).populate('user');

  if (!ride) {
    throw new error('Ride not Found');
  }

  return ride;
}

const crypto = require('crypto');
const rideModel = require('../models/ride.model');
const mapService = require("./maps.service")

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("pickup and destination are required");
  }
  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const baseFare = { auto: 10, car: 20, moto: 5 };
  const perKmRate = { auto: 10, car: 15, moto: 8 };
  const perMinRate = { auto: 1, car: 2, moto: 0.5 };

  // ✅ FIXED: Google API returns { value: <number>, text: "..." } — must use .value
  const distanceInKm = distanceTime.distance.value / 1000;
  const durationInMin = distanceTime.duration.value / 60;

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
    if (crypto.randomInt) {
      return crypto.randomInt(min, max + 1).toString();
    } else {
      const otp = Math.floor(Math.random() * (max - min + 1)) + min;
      return otp.toString();
    }
  }
  return generateOtp(num);
}

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error('All fields are required');
  }
  const fare = await getFare(pickup, destination);

  // ✅ FIXED: added await so ride is actually returned, not a Promise
  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType]
  });

  return ride;
}

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error('Ride id is Required');
  }

  // ✅ FIXED: captain._id (actual value) instead of string 'captain._id'
  await rideModel.findOneAndUpdate(
    { _id: rideId },
    { status: 'accepted', captain: captain._id }
  );

  // ✅ FIXED: use rideId (not undefined 'ride' variable), populate both user and captain
  const ride = await rideModel.findOne({ _id: rideId })
    .populate('user')
    .populate('captain')
    .select('+otp');

  if (!ride) {
    throw new Error('Ride not Found');
  }

  return ride;
}

module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error('Ride id and OTP are required');
  }

  const ride = await rideModel.findOne({ _id: rideId })
    .populate('user')
    .populate('captain')
    .select('+otp');

  if (!ride) throw new Error('Ride not found');
  if (ride.status !== 'accepted') throw new Error('Ride not accepted');
  if (ride.otp !== otp) throw new Error('Invalid OTP');

  await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'ongoing' });

  return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) throw new Error('Ride id is required');

  const ride = await rideModel.findOne({ _id: rideId, captain: captain._id })
    .populate('user')
    .populate('captain');

  if (!ride) throw new Error('Ride not found');
  if (ride.status !== 'ongoing') throw new Error('Ride not ongoing');

  await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'completed' });

  return ride;
}
const axios = require('axios');
const captainModel = require('../models/captain.model');
module.exports.getAddressCoordinate = async function (address) {
	const apiKey = process.env.GOOGLE_MAPS_API;
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
	try {
		const response = await axios.get(url);
		if (response.data.status === 'OK') {
			const location = response.data.results[0].geometry.location;
			return {
				lat: location.lat,
				lng: location.lng
			};
		} else {
			throw new Error('Unable to fetch coordinates');
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}
module.exports.getDistanceTime = async (origin, destination) => {
	if (!origin || !destination) {
		throw new Error('Origin and destination are required');
	}
	const apiKey = process.env.GOOGLE_MAPS_API;
	const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
	try {
		const response = await axios.get(url);
		if (response.data.status === 'OK') {
			if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
				throw new Error('No routes found');
			}
			// Return distance and duration in meters and seconds
			return {
				distance: response.data.rows[0].elements[0].distance.value,
				duration: response.data.rows[0].elements[0].duration.value
			};
		} else {
			throw new Error('Unable to fetch distance and time');
		}
	} catch (err) {
		console.error(err);
		throw err;
	}
}

module.exports.getAutoCompleteSuggestions = async (input) => {
	if (!input) {
		throw new Error('query is required');
	}
	const apiKey = process.env.GOOGLE_MAPS_API;
	const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
	try {
		const response = await axios.get(url);
		if (response.data.status === 'OK' || response.data.status === 'ZERO_RESULTS') {
			return response.data.predictions || [];
		} else {
			console.error('Google Places API error:', response.data.status, response.data.error_message);
			throw new Error(`Google API error: ${response.data.status}`);
		}
	} catch (err) {
		console.error(err);
		throw err;
	}
}

module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
<<<<<<< HEAD
	//radius in KM
	console.log(`[maps.service] Searching for captains in radius ${radius}km around [lng: ${lng}, lat: ${lat}]`);
	const captains = await captainModel.find({
		location: {
			$geoWithin: {
				$centerSphere: [[lng, lat], radius / 60371]
			}
		}
	});
	console.log(`[maps.service] Found ${captains.length} captains matching geolocation.`);

	return captains;
=======
	// radius in KM
	// Captain location is stored as flat {lat, lng}, not GeoJSON,
	// so we use haversine formula in JS instead of $geoWithin
	const captains = await captainModel.find({ 'location.lat': { $exists: true }, 'location.lng': { $exists: true } });

	const toRad = (val) => (val * Math.PI) / 180;
	const R = 6371; // Earth radius in km

	return captains.filter(captain => {
		const dLat = toRad(captain.location.lat - lat);
		const dLng = toRad(captain.location.lng - lng);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRad(lat)) * Math.cos(toRad(captain.location.lat)) *
			Math.sin(dLng / 2) * Math.sin(dLng / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c;
		return distance <= radius;
	});
>>>>>>> 2089b0ac1a2fd268299f0f576743ae495ea0f95b
}
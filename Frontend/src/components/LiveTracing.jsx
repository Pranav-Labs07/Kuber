import React, { useState, useEffect } from 'react'
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps'

const containerStyle = {
    width: '100%',
    height: '100%',
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            console.error('Geolocation is not supported by this browser.');
            setCurrentPosition({ lat: 20.5937, lng: 78.9629 });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error('Error getting location:', error);
                setCurrentPosition({ lat: 20.5937, lng: 78.9629 });
            },
            { enableHighAccuracy: true }
        );

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error('Watch position error:', error);
            },
            { enableHighAccuracy: true }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    if (!currentPosition) {
        return (
            <div style={containerStyle} className='flex items-center justify-center bg-gray-100'>
                <p className='text-gray-500 text-sm'>Getting your location...</p>
            </div>
        );
    }

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map
                style={containerStyle}
                defaultCenter={currentPosition}
                center={currentPosition}
                defaultZoom={15}
                mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID'}
            >
                <AdvancedMarker position={currentPosition} />
            </Map>
        </APIProvider>
    );
};

export default LiveTracking;
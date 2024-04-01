import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl'; // Import mapbox-gl library

// Define MapBoxComponent function component
const MapBoxComponent = ({ initialCenter, zoom, mapboxAccessToken, gameId, playerId, onSubmitAnswer }) => {
  const [map, setMap] = useState(null); // State to store the map object
  const mapContainer = useRef(null); // Ref for the map container element

  // Function to handle user click on the map
  const handleMapClick = (event) => {
    const clickedCoordinates = {
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat
    };
    onSubmitAnswer(clickedCoordinates); // Call the onSubmitAnswer callback with clicked coordinates
  };

  // Effect to initialize the map when component mounts
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW1lbWJhZCIsImEiOiJjbHU2dTF1NHYxM3drMmlueDV3ZGtvYTlvIn0.UhwX7hVWfe4fJA-cjCX70w'; // Set Mapbox access token

    const initializedMap = new mapboxgl.Map({
      container: mapContainer.current, // Reference to the map container element
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: initialCenter, // Initial map center
      zoom: zoom // Initial zoom level
    });

    // Add event listener for map click
    initializedMap.on('click', handleMapClick);

    // Set the map state
    setMap(initializedMap);

    // Cleanup function to remove map on component unmount
    return () => {
      initializedMap.remove();
    };
  }, [initialCenter, zoom, mapboxAccessToken, onSubmitAnswer]);

  return (
    <div ref={mapContainer} style={{ width: '100%', height: '400px' }}></div> // Map container element
  );
};

export default MapBoxComponent;

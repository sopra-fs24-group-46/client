/*
* import React, { useState, useEffect, useRef } from 'react';
import DeckGL from '@deck.gl/react';
import { Map } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW1lbWJhZCIsImEiOiJjbHU2dTF1NHYxM3drMmlueDV3ZGtvYTlvIn0.UhwX7hVWfe4fJA-cjCX70w';

const MAPBOX_STYLE_URL = 'mapbox://styles/mapbox/streets-v11';

const SimpleMap = () => {
  const mapContainer = useRef(null);
  const gameId = localStorage.getItem('gameId');
  const [longitude, setLng] = useState(8.2275);
  const [latitude, setLat] = useState(46.8182);
  const [zoom, setZoom] = useState(9);


  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAPBOX_STYLE_URL,
      center: [longitude, latitude],
      zoom: zoom,
    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));

    });

    return () => map.remove();
  }, []);

  const handleMapClick = (info, event) => {
    const { lngLat } = info;
    if (lngLat) {
      const { lng, lat } = lngLat;
      submitCoordinates(lng, lat);
    }
  };

  const submitCoordinates = (lng, lat) => {
    const backendURL = `http://localhost:8080/game/${gameId}/guess`;

    fetch(backendURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ longitude: lng, latitude: lat }),
    })
      .then((response) => response.json())
      .then((data) => console.log('Success:', data))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <DeckGL
      initialViewState={viewport}
      controller={true}
      onClick={handleMapClick}
    >
      <Map
        reuseMaps
        mapStyle={MAPBOX_STYLE_URL}
        preventStyleDiffing={true}
        mapboxApiAccessToken={mapboxgl.accessToken}
      />
    </DeckGL>
  );
};

export default SimpleMap;
*
* */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';

const MapBoxComponent = ({   mapboxAccessToken, onSubmitAnswer }) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  const handleMapClick = (event) => {

      const clickedCoordinates = {

        x: event.lngLat.lng,
        y: event.lngLat.lat,
      };
      onSubmitAnswer(clickedCoordinates);

  };

  useEffect(() => {
    mapboxgl.accessToken = mapboxAccessToken;

    const initializedMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:  [8.2275, 46.8182],
      zoom: 7,
    });

    initializedMap.on('click', handleMapClick);

    setMap(initializedMap);

    return () => {
      initializedMap.remove();
    };
  }, [ mapboxAccessToken, onSubmitAnswer]);

  useEffect(() => {
    if (map ) {
      map.setCenter([8.2275, 46.8182]);
    }
  }, [map, mapboxAccessToken]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

MapBoxComponent.propTypes = {
  //currentQuestionName: PropTypes.string.isRequired,
  //currentQuestionLocation: PropTypes.string.isRequired,
  //gameId: PropTypes.string.isRequired,
  //playerId: PropTypes.string.isRequired,
  //roundState: PropTypes.string.isRequired,
  mapboxAccessToken: PropTypes.string.isRequired,
  onSubmitAnswer: PropTypes.func.isRequired,
};

export default MapBoxComponent;




/*
15-04-2024
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';


interface MapBoxComponentProps {
  initialCenter: [number, number];
  zoom: number;
  mapboxAccessToken: string;
  onSubmitAnswer: (coordinates: { latitude: number, longitude: number }) => void;
}

const MapBoxComponent: React.FC<MapBoxComponentProps> = ({ initialCenter, zoom, mapboxAccessToken, onSubmitAnswer }) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);

  const handleMapClick = (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    const clickedCoordinates = {
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat
    };
    onSubmitAnswer(clickedCoordinates);
  };

  useEffect(() => {
    mapboxgl.accessToken = mapboxAccessToken;

    const initializedMap = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: initialCenter,
      zoom: zoom
    });

    initializedMap.on('click', handleMapClick);

    setMap(initializedMap);

    return () => {
      initializedMap.remove();
    };
  }, [initialCenter, zoom, mapboxAccessToken, onSubmitAnswer]);

  return (
    <div ref={mapContainer} style={{ width: '100%', height: '400px' }}></div>
  );
};

MapBoxComponent.propTypes = {
  initialCenter: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
  mapboxAccessToken: PropTypes.string.isRequired,
  onSubmitAnswer: PropTypes.func.isRequired
};

export default MapBoxComponent;
*/

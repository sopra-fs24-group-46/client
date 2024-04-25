import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";

const MapBoxComponent = ({ reveal, guessesMapReveal }) => {

  const mapContainer = useRef(null);
  const mapboxAccessToken = "pk.eyJ1IjoiYW1lbWJhZCIsImEiOiJjbHU2dTF1NHYxM3drMmlueDV3ZGtvYTlvIn0.UhwX7hVWfe4fJA-cjCX70w";


  let marker = null;

  useEffect(() => {

    mapboxgl.accessToken = mapboxAccessToken;
    console.log(guessesMapReveal);

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [8.2275, 46.8182],
      zoom: 7,
    });

    if (reveal === 1) {

      guessesMapReveal.forEach(player => {

        //TODO Always same colors should be choosen and playername should be displayed in popup and Text should not be white
        const { answer } = player;

        if (answer) {

          console.log(answer);

          const markerColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

          new mapboxgl.Marker({ color: markerColor })
            .setLngLat([answer.location.x, answer.location.y])
            .setPopup(new mapboxgl.Popup().setHTML("<h1>Playername</h1>"))
            .addTo(map);

        }
      });
    }

    //initializedMap.on('click', handleMapClick);
    map.on("click", (e) => {

      if (marker) {
        marker.remove();
      }

      localStorage.setItem("x", String(e.lngLat.lng));
      localStorage.setItem("y", String(e.lngLat.lat));


      const newMarker = new mapboxgl.Marker()
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map);

      marker = newMarker;
    });

    return () => {
      map.remove();
    };
  }, [guessesMapReveal]);


  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

MapBoxComponent.propTypes = {
  reveal: PropTypes.number.isRequired,
  guessesMapReveal: PropTypes.arrayOf(PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  })),


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

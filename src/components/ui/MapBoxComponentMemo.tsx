
import React, { useEffect, useRef, useState, memo} from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";
import { LineLayer } from "deck.gl";

const MapBoxComponent = ({ roundState, reveal, currentQuestionLocation, guessesMapReveal }) => {

  const mapboxAccessToken = "pk.eyJ1IjoiYW1lbWJhZCIsImEiOiJjbHU2dTF1NHYxM3drMmlueDV3ZGtvYTlvIn0.UhwX7hVWfe4fJA-cjCX70w";

  
  const mapContainer = useRef(null);
  const clickMarker = useRef(null);
  const currentLocationMarker = useRef(null);

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);



  //Functions

  const removeClickMarker = () => {

    if (clickMarker.current) {
      clickMarker.current.remove();
    };
  };

  const removeCurrentLocationMarker = () => {

    if (currentLocationMarker.current) {
      currentLocationMarker.current.remove();
    };
  };

  const removeLines = () => {

    if (map.getLayer('lineLayer')) {
      map.removeLayer('lineLayer');
      map.removeSource('lineLayer');
    };
  };

  const removeGuessMarkers = () => {

    if (markers.length > 0) {
      markers.forEach(marker => {
        marker.remove();
    });
    setMarkers([]);
    };
  };

  const createFeature = (x, y) => {

    const lineFeature = {
      "type": "Feature",
      "geometry": {
          "type": "LineString",
          "coordinates": [[x, y], [currentQuestionLocation.x, currentQuestionLocation.y]]}
    };

    return lineFeature;
  };

  const createLineLayers = (data) => {

    var featureArray = [];

    data.forEach(item => {

      if (item.guess_x && item.guess_y) {

        const feature = createFeature(item.guess_x, item.guess_y);
        featureArray.push(feature);
      }
    });

    map.addLayer({
      "id": "lineLayer",
      "type": "line",
      "source": {
          "type": "geojson",
          "data": {
              "type": "FeatureCollection",
              "features": featureArray
          }
      },
      "layout": {
          "line-join": "round",
          "line-cap": "round"
      },
      "paint": {
          "line-color": "#333399",
          "line-width": 3,
          "line-dasharray": [4, 2]
      }
    });
  };

  const getColor = (number) => {  
    switch (number) {
        case 1:
            return 'orange';
        case 2:
            return 'green';
        case 3:
            return 'blue';
        case 4:
            return 'pink';
        case 5:
          return 'yellow';
        default:
            return 'gray'; // Fallback-Farbe, wenn keine spezifische Farbe angegeben ist
    }
  };


  useEffect(() => {

    mapboxgl.accessToken = mapboxAccessToken;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [8.2275, 46.8182],
      zoom: 7,
    });

    //Make Mountain Names invisible
    map.on('load', function() {
      map.setLayoutProperty('natural-point-label', 'visibility', 'none');
    });


    map.on("click", (e) => {

      removeClickMarker();


      localStorage.setItem("x", String(e.lngLat.lng));
      localStorage.setItem("y", String(e.lngLat.lat));


      const newMarker = new mapboxgl.Marker()
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map);

        clickMarker.current = newMarker;
    });

    setMap(map);

  }, [])


  useEffect(() => {

    if (map) {

      //Removing all markers and lines from the map
      removeClickMarker();
      removeCurrentLocationMarker();
      removeGuessMarkers();
      removeLines();


      if (roundState === "MAP_REVEAL") {

        if(guessesMapReveal && currentQuestionLocation) {

          //Create marker for current question location
          const newMarker = new mapboxgl.Marker({color: 'red'})
          .setLngLat([currentQuestionLocation.x, currentQuestionLocation.y])
          .addTo(map);
  
          currentLocationMarker.current = newMarker;

          //Array for testing without BE data
          const testArray = [{colorNumber: 1, guess_x:7.5, guess_y:46.8},{colorNumber: 2, guess_x:7.9, guess_y:46.1}, {colorNumber: 3, guess_x:8.1, guess_y:45.2}];

          //Create the markers for players guesses
          const newMarkers = guessesMapReveal.map(item => {
            return new mapboxgl.Marker({color: getColor(item.colorNumber)})
                .setLngLat([item.guess_x, item.guess_y])
                .addTo(map);
          });
  
          setMarkers(newMarkers);

          //Create the lines to correct location
          createLineLayers(guessesMapReveal);

        }
      }
    }

  }, [guessesMapReveal, roundState])


  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

MapBoxComponent.displayName = 'MapBoxComponent';

MapBoxComponent.propTypes = {

  roundState: PropTypes.string,
  reveal: PropTypes.number.isRequired,
  currentQuestionLocation: PropTypes.string.isRequired,
  guessesMapReveal: PropTypes.arrayOf(PropTypes.shape({
    playerId: PropTypes.string.isRequired,
    guess_x: PropTypes.number.isRequired,
    guess_y: PropTypes.number.isRequired,
    colorNumber: PropTypes.number.isRequired,
  })),

};


export default MapBoxComponent;

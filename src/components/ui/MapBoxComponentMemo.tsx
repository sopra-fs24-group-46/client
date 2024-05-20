
import React, { useEffect, useRef, useState, memo} from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";
import { LineLayer } from "deck.gl";

const MapBoxComponent = ({ roundState, jokerData, currentQuestionLocation, guessesMapReveal, setAnswer }) => {

  const mapboxAccessToken = "pk.eyJ1IjoiYW1lbWJhZCIsImEiOiJjbHU2dTF1NHYxM3drMmlueDV3ZGtvYTlvIn0.UhwX7hVWfe4fJA-cjCX70w";

  
  const mapContainer = useRef(null);
  const clickMarker = useRef(null);
  const currentLocationMarker = useRef(null);

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);



  //Functions

  //Removes current clickMarker if it exists on the map
  const removeClickMarker = () => {

    if (clickMarker.current) {
      clickMarker.current.remove();
    };
  };

  //Removes currenLocationMarker if it exists on the map
  const removeCurrentLocationMarker = () => {

    if (currentLocationMarker.current) {
      currentLocationMarker.current.remove();
    };
  };

  //Removes layer and source of lines (guess - correctLocation) if they exist
  const removeLines = () => {

    if (map.getLayer('lineLayer')) {
      map.removeLayer('lineLayer');
      map.removeSource('lineLayer');
    };
  };

  //Removes joker circle if it exists
  const removeCircle = () => {

    if (map.getLayer('polygon')) {
      map.removeLayer('polygon');
      map.removeSource('polygon');
    };
  };

  //Removes guess markers of all players if they exist
  const removeGuessMarkers = () => {

    if (markers.length > 0) {
      markers.forEach(marker => {
        marker.remove();
    });
    setMarkers([]);
    };
  };

  //creates feature for a single line
  const createFeature = (x, y) => {

    const lineFeature = {
      "type": "Feature",
      "geometry": {
          "type": "LineString",
          "coordinates": [[x, y], [currentQuestionLocation.x, currentQuestionLocation.y]]}
    };
    return lineFeature;
  };

  //creates layer for lines and multiple features (multiple lines)
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

  //Selects color which is fixed for every player
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
            return 'gray'; // Fallback-color
    }
  };

  //Creates circle polygon as source for the joker circle
  var createGeoJSONCircle = function(center, radiusInKm, points) {
    if(!points) points = 64;

    var coords = {
        latitude: center[1],
        longitude: center[0]
    };

    var km = radiusInKm;

    var ret = [];
    var distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180));
    var distanceY = km/110.574;

    var theta, x, y;
    for(var i=0; i<points; i++) {
        theta = (i/points)*(2*Math.PI);
        x = distanceX*Math.cos(theta);
        y = distanceY*Math.sin(theta);

        ret.push([coords.longitude+x, coords.latitude+y]);
    }
    ret.push(ret[0]);

    return {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [ret]
                }
            }]
        }
    };
  };

  //creates joker circle
  const createCircle = (x,y, radiusInKm) => {

    var center = [x,y];

    const randomVariable_1 = Math.floor(Math.random() * 2); // Generate either 0 or 1
    const randomVariable_2 = Math.floor(Math.random() * 2); // Generate either 0 or 1

    if(randomVariable_1 === 1) {
      center[randomVariable_2] += 0.05;
    } else {
      center[randomVariable_2] -= 0.05;
    }

    map.addSource("polygon", createGeoJSONCircle(center, radiusInKm, 64));

    map.addLayer({
      "id": "polygon",
      "type": "fill",
      "source": "polygon",
      "layout": {},
      "paint": {
          "fill-color": "red",
          "fill-opacity": 0.5
      }
    });
  };


  useEffect(() => {

    //Map gets loaded only when starting a game or refreshing the site
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
      map.setLayoutProperty('water-point-label', 'visibility', 'none');
      map.setLayoutProperty('water-line-label', 'visibility', 'none');
    });


    setMap(map);

  }, [])
  
  useEffect(() => {
    if (!map) return;
    //Adds new onclick listener with updated roundstate
    map.on("click", guessOnClick);
    //removes old onclick listener
    return () => map.off("click", guessOnClick);
  }, [roundState]);


  const guessOnClick = (e) => {
    //Visualize the current guessing position
    if (roundState === "GUESSING") {
      removeClickMarker();
      setAnswer({ x: e.lngLat.lng, y: e.lngLat.lat })
      const newMarker = new mapboxgl.Marker()
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map);
      clickMarker.current = newMarker;
    }
  }

  useEffect(() => {

    if (map) {

      //Removing all markers, lines and circle from the map
      removeClickMarker();
      removeCurrentLocationMarker();
      removeGuessMarkers();
      removeLines();
      removeCircle();

      if (roundState === "GUESSING") {

        if(jokerData && jokerData.joker) {

            console.log("jokerData: ", jokerData);

            createCircle(jokerData.center[0], jokerData.center[1], 10);
        }
      }


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

        };
      };
    };

  }, [guessesMapReveal, roundState, jokerData])


  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

MapBoxComponent.displayName = 'MapBoxComponent';

MapBoxComponent.propTypes = {

  roundState: PropTypes.string,
  jokerData: PropTypes.shape({
    joker: PropTypes.bool.isRequired,
    center: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  }).isRequired,
  currentQuestionLocation: PropTypes.shape({x: PropTypes.number.isRequired, y: PropTypes.number.isRequired}).isRequired,
  guessesMapReveal: PropTypes.arrayOf(PropTypes.shape({
    playerId: PropTypes.string.isRequired,
    guess_x: PropTypes.number.isRequired,
    guess_y: PropTypes.number.isRequired,
    colorNumber: PropTypes.number.isRequired,
  })),
  setAnswer: PropTypes.func.isRequired,

};


export default MapBoxComponent;

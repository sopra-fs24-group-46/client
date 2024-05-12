
import React, { useEffect, useRef, memo} from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";

const areEqual = (prevProps, nextProps) => true;

const MapBoxComponent = memo(({ reveal, currentQuestionLocation, guessesMapReveal }) => {

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

    let currentQuestionMarker = null;
    // Function to update the current question marker
    const updateCurrentQuestionMarker = (location) => {
      if (currentQuestionMarker) {
        currentQuestionMarker.remove();
      }


      if (location) {
        currentQuestionMarker = new mapboxgl.Marker({
          color: "red", // or any other color you prefer
        })
            .setLngLat([location.x, location.y])
            .addTo(map);
      }
    };


    // Update the current question marker when the component mounts
    updateCurrentQuestionMarker(currentQuestionLocation);
    if (reveal === 1) {

      /*
        //TODO Always same colors should be choosen and playername should be displayed in popup and Text should not be white
        */
      guessesMapReveal.forEach(player => {
        const { answer } = player;

        
        //TODO make Component
        const getColorForNumber = (number) => {
          switch (number) {
              case 1:
                  return 'orange';
              case 2:
                  return 'green';
              case 3:
                  return 'blue';
              case 4:
                  return 'pink';
              default:
                  return 'gray'; // Fallback-Farbe, wenn keine spezifische Farbe angegeben ist
          }
      };

        if (answer) {
          console.log(answer.colourNumber)
          const markerColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

          new mapboxgl.Marker({ color: getColorForNumber(player.colourNumber) })
              .setLngLat([answer.location.x, answer.location.y])
              .addTo(map);

          // Create the popup and add it to the map
          const popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: false,
          })
              .setLngLat([answer.location.x, answer.location.y])
              .setHTML(`
          <div style="background-color: #f4f4f4; color: #333; padding: 12px; border-radius: 8px;">
            <h3 style="margin: 0; font-size: 13px; font-weight: bold; color: #007bff;">${player.playerId}</h3>
            <p style="margin: 8px 0 0; font-size: 12px; color: #333;">Coordinates:</p>
            <p style="margin: 0; font-size: 12px; color: #333;">[${answer.location.x.toFixed(6)}, ${answer.location.y.toFixed(6)}]</p>
          </div>
        `);

          //popup.addTo(map);
        }
      });

    }

    //Make Mountain Names invisible
    map.on('load', function() {
      map.setLayoutProperty('natural-point-label', 'visibility', 'none');
    });


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
      if (currentQuestionMarker) {
        currentQuestionMarker.remove();
      }
      map.remove();
    };
  }, []);


  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
});

MapBoxComponent.displayName = 'MapBoxComponent';

MapBoxComponent.propTypes = {

  reveal: PropTypes.number.isRequired,
  currentQuestionLocation: PropTypes.string.isRequired,
  guessesMapReveal: PropTypes.arrayOf(PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    colourName: PropTypes.number.isRequired,
  })),


};


export default MapBoxComponent;

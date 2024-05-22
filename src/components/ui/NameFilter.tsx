import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ValidatedTextInput from "./ValidatedTextInput";
import {lakes, mountains, main_hills, hills, alpine_mountains} from "helpers/Constants";


const NameFilter = ({ locationNames, setLocationNames, locationTypes, ...props }) => {

  const [locationNamePool, setLocationNamePool] = useState([]);

  useEffect(() => {
      const locationNamePool = locationTypes.flatMap((type) => getLocationNamesForLocationType(type));
      setLocationNamePool(locationNamePool);
  }, [locationTypes])

  const addName = (name: string) => {
    if (name && !locationNames.includes(name)) {
      setLocationNames([...locationNames, name]);
    }
  };
  
  const removeName = (name: string) => {
    if (name &&locationNames.includes(name)) {
      setLocationNames(locationNames.filter((n) => n !== name));
    }
  };

  return (
    <div >
      <ValidatedTextInput
        validStrings={locationNamePool}
        label="Add name"
        placeholder="Add name"
        onValidString={addName}
        dropDownMaxHeight={"40vh"}
      />
      <ValidatedTextInput
        validStrings={locationNamePool}
        label="Remove name"
        placeholder="Remove name"
        onValidString={removeName}
        dropDownMaxHeight={"40vh"}
      />
      <div style={{overflowY: "scroll", maxHeight: "40vh"}}>
        {locationNames.map((locationName) => (
          <div key={locationName}>{locationName}
            {locationName? <span style={{cursor: "pointer", opacity: 0.5, marginLeft: "5px"}} className="remove-player" onClick={() => removeName(locationName)}>&#10006;</span>:null }
          </div>
        ))}
      </div>
    </div>
  );
};

NameFilter.propTypes = {
  locationNames: PropTypes.array.isRequired,
  setLocationNames: PropTypes.func.isRequired,
  locationTypes: PropTypes.array.isRequired,
  dropDownMaxHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default NameFilter;

const getLocationNamesForLocationType = (locationType: string) => {
  if (locationType === "ALPINE_MOUNTAIN") {
    return alpine_mountains;
  } else if (locationType === "MOUNTAIN") {
    return mountains;
  } else if (locationType === "MAIN_HILL") {
    return main_hills;
  } else if (locationType === "HILL") {
    return hills;
  } else if (locationType === "LAKE") {
    return lakes;
  }
}
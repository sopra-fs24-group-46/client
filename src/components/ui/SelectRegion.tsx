import React from "react";
import PropTypes from "prop-types";
import { Button } from "./Button";
import ValidatedTextInput from "./ValidatedTextInput";


const SelectRegion = ({ region, setRegion, regionType, setRegionType, ...props }) => {

  const validStrings = [...cantons, ...districts];

  const trySetRegionType = (type: string, region: string) => {
    setRegionType(selectRegionType(region, type));    
  }

  const setRegionAndPossiblyType = (region: string) => {
    setRegion(region);
    if (region===null) setRegionType(null);
    var types = getRegionTypesForRegion(region);
    trySetRegionType(types[0], region);
  }

  const isRegionInRegionType = (region, type) =>
    type === "CANTON"
      ? cantons.includes(region)
      : districts.includes(region);

  return (
    <div className="regions">
      <ValidatedTextInput
        validStrings={validStrings}
        label="Region"
        onValidString={setRegionAndPossiblyType}
        dropDownMaxHeight={props.dropDownMaxHeight}
      />
      <Button
        onClick={() => trySetRegionType("CANTON", region)}
        className={regionType === "CANTON" ? "selected" : ""}
        disabled={!isRegionInRegionType(region, "CANTON")}
      >
        Canton
      </Button>
      <Button
        onClick={() => trySetRegionType("DISTRICT", region)}
        className={regionType === "DISTRICT" ? "selected" : ""}
        disabled={!isRegionInRegionType(region, "DISTRICT")}
      >
        District
      </Button>
    </div>
  );
};

SelectRegion.propTypes = {
  region: PropTypes.string.isRequired,
  setRegion: PropTypes.func.isRequired,
  regionType: PropTypes.string.isRequired,
  setRegionType: PropTypes.func.isRequired,
  dropDownMaxHeight: PropTypes.string,
};

const cantons = [ "Bern", "Vaud", "St. Gallen", "Fribourg", "Aargau", "Thurgau", "Solothurn", "Basel-Landschaft", "Obwalden", "Genève", "Schaffhausen", "Appenzell Innerrhoden", "Graubünden", "Appenzell Ausserrhoden", "Zug", "Uri", "Luzern", "Jura", "Nidwalden", "Ticino", "Schwyz", "Basel-Stadt", "Neuchâtel", "Valais", "Zürich", "Glarus" ]
const districts = [ "Interlaken-Oberhasli", "Bern-Mittelland", "Visp", "Jura bernois", "Hérens", "Frauenfeld", "Raron", "Broye-Vully", "See", "St. Gallen", "Baden", "Wil", "La Broye", "Horgen", "Biel/Bienne", "Schaffhausen", "Arbon", "Thierstein", "Laufen", "Wasseramt", "Rorschach", "Dorneck", "Luzern-Stadt", "Surselva", "La Glâne", "Münchwilen", "Gersau", "Sion", "Werdenberg", "Les Franches-Montagnes", "Rheinfelden", "Oberklettgau", "Entlebuch", "Martigny", "Entremont", "Porrentruy", "Blenio", "Reiat", "Hochdorf", "Liestal", "Schleitheim", "Brig", "Bülach", "Hinterland", "Bremgarten", "Viamala", "Dietikon", "Rheintal", "Pfäffikon", "Frutigen-Niedersimmental", "Lenzburg", "Meilen", "Sursee", "Kreuzlingen", "Leuk", "Lebern", "Sarganserland", "Maloja", "Riviera-Pays-d'Enhaut", "La Sarine", "Schwyz", "Oberaargau", "Zurzach", "Bernina", "Affoltern", "Hinwil", "Sissach", "Lugano", "La Gruyère", "Luzern-Land", "Bucheggberg", "Locarno", "Thal", "Emmental", "Solothurn", "Gösgen", "Sense", "Zofingen", "Landquart", "Gros-de-Vaud", "Andelfingen", "Muri", "Willisau", "Thun", "Uster", "Albula", "Obersimmental-Saanen", "Leventina", "Seeland", "La Veveyse", "Monthey", "Dielsdorf", "Ouest lausannois", "Prättigau/Davos", "Plessur", "Zürich", "Weinfelden", "Nyon", "Riviera", "Saint-Maurice", "Brugg", "Höfe", "Toggenburg", "Conthey", "March", "Imboden", "Arlesheim", "Bellinzona", "Lausanne", "Lavaux-Oron", "Sierre", "Winterthur", "Mendrisio", "Stein", "Unterklettgau", "Aarau", "Laufenburg", "Olten", "Jura-Nord vaudois", "Mittelland", "Einsiedeln", "Küssnacht (SZ)", "Gäu", "Vorderland", "Morges", "Delémont", "Aigle", "Waldenburg", "See-Gaster", "Vallemaggia", "Moesa", "Goms", "Engiadina Bassa/Val Müstair", "Kulm" ]

//can be both
const getRegionTypesForRegion = (region: string) => {
  var types = [];
  if (cantons.includes(region)) {
    types.push("CANTON")
  }
  if (districts.includes(region)) {
    types.push("DISTRICT")
  }
  return types;
}

//if you have a choice, it gives your choice, else it will select the appropriate type
const selectRegionType = (region: string, regionType: string) => {
  var types = getRegionTypesForRegion(region);
  if (types.length === 0) {
    return null;
  }
  if (types.includes(regionType)) {
    return regionType;
  } else {
    return types[0];
  }
}

export default SelectRegion;
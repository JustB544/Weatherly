import React, { useContext, useEffect } from "react";
import { useLocalStorage } from "./hooks";
import SettingsContext from "./SettingsContext";
import LocationBox from "./LocationBox";
import SearchBar from "./SearchBar";
import './LocationList.css';


function LocationList(){
    const {locations} = useContext(SettingsContext);

    return (
        <div className="LocationList">
            {Object.keys(locations).map((l) =>
                <LocationBox key={l} id={l} location={locations[l]} page="home"/>
            )}
        </div>
    );
}

export default LocationList;
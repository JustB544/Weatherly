import React, { useContext, useEffect } from "react";
import { useLocalStorage } from "./hooks";
import SettingsContext from "./SettingsContext";
import LocationBox from "./LocationBox";
import SearchBar from "./SearchBar";
import './LocationList.css';


function LocationList(){
    const {locations} = useContext(SettingsContext);

    if (Object.keys(locations).length === 0){
        return <h2 style={{color: "#999999"}}>No locations added</h2>
    }

    return (
        <div className="LocationList">
            {Object.keys(locations).map((l) =>
                <LocationBox key={l} id={l} location={locations[l]} page="home"/>
            )}
        </div>
    );
}

export default LocationList;
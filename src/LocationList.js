import React from "react";
import { useLocalStorage } from "./hooks";
import {v4 as uuid} from 'uuid';
import LocationBox from "./LocationBox";
import SearchBar from "./SearchBar";
import './LocationList.css';


function LocationList(){
    const [locations] = useLocalStorage("locations", true, () => ({"2551650": "Castle Rock"}));
    return (
        <div className="LocationList">
            {/* <SearchBar /> */}
            {Object.keys(locations).map((l) =>
                <LocationBox key={l} location={locations[l]}/>
            )}
        </div>
    );
}

export default LocationList;
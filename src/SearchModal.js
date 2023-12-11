import React, { useState } from "react";
import LocationBox from "./LocationBox";
import SearchBar from "./SearchBar";
import WeatherApi from "./api";
import './SearchModal.css';


function SearchModal({endModal}){
    const [locations, setLocations] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    async function search(q){
        setIsLoading(true);
        const obj = {};
        (await WeatherApi.search(q)).map(v => obj[v.id] = v.url);
        setLocations(obj);
        setIsLoading(false);
    }

    return (
        <div className="SearchModalBackground">
            <div className="SearchModal">
                <div>
                    <span className="exit" onClick={endModal}>&times;</span>
                    <h2>Search</h2>
                </div>
                {(isLoading) ? <p>Loading &hellip;</p> : 
                <>
                <SearchBar searchFunction={(val, evt) => search(val)}/>
                <div className="SearchModalList">
                    {Object.keys(locations).map((l) =>
                        <LocationBox key={l} location={locations[l]}/>
                    )}
                </div> </>
                }
            </div>
        </div>
    );
}

export default SearchModal;
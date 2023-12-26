import React, { useContext, useState } from "react";
import LocationBox from "./LocationBox";
import SearchBar from "./SearchBar";
import WeatherApi from "./api";
import NavContext from "./NavContext";
import Modal from "./Modal";
import './SearchModal.css';


function SearchModal({endModal}){
    const [locations, setLocations] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const {navContext} = useContext(NavContext);

    async function search(q){
        setIsLoading(true);
        const obj = {};
        (await WeatherApi.search(q)).map(v => obj[v.id] = v.url);
        setLocations(obj);
        setIsLoading(false);
    }

    return (
        <Modal name="Search" endModal={endModal}>
            {(isLoading) ? <p>Loading &hellip;</p> : 
            <>
            <SearchBar searchFunction={(val, evt) => search(val)}/>
            <div className="SearchModalList">
                {Object.keys(locations).map((l) =>
                    <LocationBox key={l} id={l} location={locations[l]} page={(navContext.home) ? "add" : "add-detail"}/>
                )}
            </div> </>
            }
        </Modal>
    );
}

export default SearchModal;
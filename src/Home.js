import React, { useContext, useState } from "react";
import LocationList from "./LocationList";
import './Home.css';
import SearchModal from "./SearchModal";
import NavContext from "./NavContext";


function Home(){
    const {navContext, setNavContext} = useContext(NavContext);

    return (
        <div className="Home">
            <div className="HomeCenter">
                <LocationList />
            </div>
            { navContext.modalType === "add" && <SearchModal endModal={() => setNavContext(nc => ({...nc, modalType: null}))}/>}
        </div>
    );
}

export default Home;
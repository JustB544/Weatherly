import React, { useContext, useState } from "react";
import LocationList from "./LocationList";
import './Home.css';


function Home(){

    return (
        <div className="Home">
            <div className="HomeCenter">
                <LocationList />
            </div>
        </div>
    );
}

export default Home;
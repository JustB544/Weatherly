import React, { useState } from "react";
import LocationList from "./LocationList";
import './Home.css';
import SearchModal from "./SearchModal";


function Home(){
    const [modal, setModal] = useState(false);

    return (
        <div className="Home">
            <div className="HomeCenter">
                <div className="HomeAdd">
                    <button onClick={() => setModal(true)}>Add</button>
                </div>
            </div>
            <div className="HomeCenter">
                <LocationList />
            </div>
            { modal && <SearchModal endModal={() => setModal(false)}/>}
        </div>
    );
}

export default Home;
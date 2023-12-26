import React, {Children} from "react";
import './LocationDetailBox.css';

function LocationDetailBox({children}){
    return (
        <div className="LocationDetailBox">
            {Children.toArray(children)}
        </div>
    );
}

export default LocationDetailBox;
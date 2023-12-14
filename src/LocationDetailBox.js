import React, {Children} from "react";
import './LocationDetailBox.css';

function LocationDetailBox({children}){
    return (
        <td className="LocationDetailBox">
            {Children.toArray(children)}
        </td>
    );
}

export default LocationDetailBox;
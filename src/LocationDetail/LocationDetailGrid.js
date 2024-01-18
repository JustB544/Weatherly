/** Organizes LocationDetailBoxes into a table grid based on height and width */

import React, {Children, useEffect} from "react";
import './LocationDetailGrid.css';

function LocationDetailGrid({children, height, width}){

    useEffect(() => {
        if (height * width !== Children.count(children)){
            throw new Error("Error: the number of children in must be equal to the area of the grid");
        }
    }, []);


    return (
        <div className="LocationDetailGrid">
            {Array.from({length: height}, (v, i) => i).map((v) =>
                <div key={v} className="LocationDetailGridRow"> {Children.toArray(children).slice(v*width, (v+1)*width)}</div>
            )}
        </div>
    );
}

export default LocationDetailGrid;
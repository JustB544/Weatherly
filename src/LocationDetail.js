import React, { useEffect, useState } from "react";
import { useLoaderData, useParams, json, useNavigate } from "react-router-dom";
import WeatherApi from "./api";

function LocationDetail(){
    const [forecast, setForecast] = useState({});
    const [history, setHistory] = useState({});
    const { location } = useParams();
    const navigate = useNavigate();
    const data = useLoaderData();

    useEffect(() => {
        console.log(data);
    }, []);

    if (Object.keys(forecast).length === 0){
        return <p>Loading &hellip;</p>;
    }

    return (
        <div>
            <div>

            </div>
            <div>
                
            </div>
        </div>
    );
}

const locationDetailLoader = async ({params}) => json(await WeatherApi.getForecast(params.location), {status: 200});


export default LocationDetail;
export {locationDetailLoader};
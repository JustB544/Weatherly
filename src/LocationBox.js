import React, {useEffect, useState, useContext} from "react";
import WeatherApi from "./api";
import TimeContext from "./TimeContext";
import './LocationBox.css';
import { useNavigate } from "react-router-dom";


function LocationBox({location}){
    const [data, setData] = useState({});
    const {time} = useContext(TimeContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function get(){
            setData(await WeatherApi.getCurrentWeather(location));
        }
        get();
    }, []);

    if (Object.keys(data).length === 0){
        return <p>Loading &hellip;</p>;
    }

    return (
        <div className="LocationBox" onClick={() => navigate(`/${location}`)}>
            <div>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <h2>{data.location.name}</h2>
                    <img src={data.current.condition.icon} alt={data.current.condition.text}/>
                </div>
                <p>{Intl.DateTimeFormat("en-US", {timeZone: data.location.tz_id, hour: "numeric", minute: "numeric"}).format(time)}</p>
            </div>
            <div>
                <h3>{data.current.temp_f}°</h3>
                <p>{data.current.condition.text}</p>
            </div>
        </div>
    );
}

export default LocationBox;
import React, {useEffect, useState, useContext} from "react";
import WeatherApi from "./api";
import TimeContext from "./TimeContext";
import SettingsContext from "./SettingsContext";
import { useLocalStorage } from "./hooks";
import './LocationBox.css';
import { useNavigate } from "react-router-dom";


function LocationBox({id, location, page}){
    const [data, setData] = useState({});
    const {time} = useContext(TimeContext);
    const {settings, isDesktop, locations, setLocations} = useContext(SettingsContext);
    const navigate = useNavigate();
    const [added, setAdded] = useState(page === "home");

    useEffect(() => {
        async function get(){
            setData(await WeatherApi.getCurrentWeather(location));
        }
        get();
    }, []);


    function deleteLocation(evt){
        evt.stopPropagation();
        if (!added){
            console.log("I messed up :(");
        }
        const _locations = {...locations};
        delete _locations[id];
        setLocations(_locations);
        setAdded(false);
    }

    function addLocation(evt){
        evt.stopPropagation();
        if (added){
            console.log("I messed up :(");
        }
        setLocations({...locations, [id]: location});
        setAdded(true);
    }

    if (Object.keys(data).length === 0){
        return <p>Loading &hellip;</p>;
    }

    return (
        <div className="LocationBox" onClick={() => navigate(`/${location}`)} style={(page !== "home") ? {fontSize: "13.33px"} : {}}>
            <div className="LocationBoxLeft">
                <img src={data.current.condition.icon.replace("64x64", (isDesktop && page === "home") ? "128x128" : "64x64")} alt={data.current.condition.text}/>
            </div>
            <div className="LocationBoxRight">
                <div style={{padding: "1em", textAlign: "left", width: "fit-content", float: "left"}}>
                    <span style={{fontSize: "1.8em"}}>{data.location.name}, {data.location.region}</span>
                    <p style={{margin: "0.5em 0 0 0"}}>{Intl.DateTimeFormat("en-US", {timeZone: data.location.tz_id, hour: "numeric", minute: "numeric"}).format(time)}</p>
                </div>
                {(page === "home" || added) ? 
                <i className="fa fa-remove LocationBoxSymbol" onClickCapture={deleteLocation}></i> : (page === "add") ? 
                <i className="fa fa-plus LocationBoxSymbol" onClickCapture={addLocation}></i> : 
                <i className="fa fa-plus LocationBoxSymbol" onClickCapture={(evt) => {
                    addLocation(evt);
                    navigate(`/${location}`);
                }}></i>}
                <div style={{padding: "1em", textAlign: "center", float: "right"}}>
                    <h3 style={{fontSize: "1.4em", margin: 0}}>{data.current[`temp_${settings.temperature}`]}°{settings.temperature.toUpperCase()}</h3>
                    <p style={{margin: "0.5em 0 0 0"}}>{data.current.condition.text}</p>
                </div>
            </div>
        </div>
    );
}

export default LocationBox;
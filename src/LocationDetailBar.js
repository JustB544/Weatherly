import React, {useContext} from "react";
import SettingsContext from "./SettingsContext";
import "./LocationDetailBar.css";

function LocationDetailBar({weather, today}){
    const date = new Date(weather.date_epoch * 1000 + new Date().getTimezoneOffset() * 60000);
    const {settings} = useContext(SettingsContext);
    return (
        <>
        <div className="LocationDetailBar">
            <div style={{display: "flex", flexDirection: "row"}}>
                <p>{(today) ? "Today" : `${Intl.DateTimeFormat('default', {weekday: "short"}).format(date)} ${date.getDate()}`}</p>
                <p><b>{Math.round(weather.day[`maxtemp_${settings.temperature}`])}°</b>/{Math.round(weather.day[`mintemp_${settings.temperature}`])}°</p>
                <img style={{width: "73px", height: "73px", margin: "7px 0"}} src={weather.day.condition.icon} alt={weather.day.condition.text}/>
            </div>
            <div style={{display: "flex", flexDirection: "row"}}>
                <p style={{fontSize: "24px"}}><img src="/rain-icon.png" alt="rain-icon" style={{width: "19px", height: "23px", float: "left", marginRight: "8px", marginTop: "3px"}}/>{weather.day.daily_chance_of_rain}%</p>
                <p style={{fontSize: "24px", overflowWrap: "normal"}}><img src="/wind-icon.png" alt="wind-icon" style={{width: "23px", height: "19px", float: "left", marginRight: "8px", marginTop: "3px"}}/>{Math.round(weather.day[`maxwind_${settings.speed}`])} {settings.speed}</p>
            </div>
        </div>
        <hr style={{color: "#BBBBBB", margin: 0}}></hr>
        </>
    );
}


export default LocationDetailBar;
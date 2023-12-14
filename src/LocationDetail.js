import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams, json, useNavigate } from "react-router-dom";
import WeatherApi from "./api";
import './LocationDetail.css';
import LocationDetailGrid from "./LocationDetailGrid";
import LocationDetailBox from "./LocationDetailBox";
import { useLocalStorage } from "./hooks";
import TimeContext from "./TimeContext";
import 'font-awesome/css/font-awesome.min.css';

function LocationDetail(){
    // const [history, setHistory] = useState({});
    const { location } = useParams();
    const navigate = useNavigate();
    const forecast = useLoaderData();
    const [settings, setSettings] = useLocalStorage("settings", true, () => ({speed: "mph", distance: "miles", temperature: "f", pressure: "in"}));
    const {time} = useContext(TimeContext);

    useEffect(() => {
        console.log(forecast);
    }, []);

    if (Object.keys(forecast).length === 0){
        return <p>Loading &hellip;</p>;
    }

    return (
        <div className="LocationDetail">
            <div className="LocationDetailLeft">
                <span><img src={forecast.current.condition.icon} alt={forecast.current.condition.text}/></span>
                <h3>{forecast.current[`temp_${settings.temperature}`]}°{settings.temperature.toUpperCase()}</h3>
                <h4>{forecast.current.condition.text}</h4>
                <hr style={{color: "#eeeeee", width: "80%"}}/>
                <h4>{Intl.DateTimeFormat("en-US", {timeZone: forecast.location.tz_id, day: "numeric", month: "long", year: "numeric"}).format(time)}</h4>
                <h4>{Intl.DateTimeFormat("en-US", {timeZone: forecast.location.tz_id, weekday: "long", hour: "numeric", minute: "numeric"}).format(time)}</h4>
                <h3>{forecast.location.name}</h3>
            </div>
            <div className="LocationDetailRight">
                <LocationDetailGrid height={3} width={3}>
                    <LocationDetailBox>
                        <p>Wind</p>
                        <h3>{forecast.current[`wind_${settings.speed}`]} {settings.speed}</h3>
                        <p>{forecast.current.wind_dir}</p>
                    </LocationDetailBox>
                    <LocationDetailBox>
                        <p>Humidity</p>
                        <h3>{forecast.current.humidity}%</h3>
                    </LocationDetailBox>
                    <LocationDetailBox>
                        <p>Feels like</p>
                        <h3>{forecast.current[`feelslike_${settings.temperature}`]}°{settings.temperature.toUpperCase()}</h3>
                    </LocationDetailBox>
                    <LocationDetailBox>
                        <p>UV index</p>
                        <h3>{forecast.current.uv}</h3>
                    </LocationDetailBox>
                    <LocationDetailBox>
                        <p>Pressure</p>
                        <h3>{forecast.current[`pressure_${settings.pressure}`]} {settings.pressure}</h3>
                    </LocationDetailBox>
                    <LocationDetailBox>
                        <p>Chance of precipitation</p>
                        <h3>{forecast.forecast.forecastday[0].day.daily_chance_of_rain}%</h3>
                    </LocationDetailBox>
                    <LocationDetailBox>
                        <p>Temperature extremes</p>
                        <h3><i className="fa fa-long-arrow-up" style={{color: "#fdacab"}}></i> {forecast.forecast.forecastday[0].day[`maxtemp_${settings.temperature}`]}°{settings.temperature.toUpperCase()}</h3>
                        <h3><i className="fa fa-long-arrow-down" style={{color: "#b0fdd3"}}></i> {forecast.forecast.forecastday[0].day[`mintemp_${settings.temperature}`]}°{settings.temperature.toUpperCase()}</h3> 
                    </LocationDetailBox>
                    <LocationDetailBox>
                        <p>Sun</p>
                        <h3>Rise {forecast.forecast.forecastday[0].astro.sunrise}</h3>
                        <h3>Set {forecast.forecast.forecastday[0].astro.sunset}</h3>
                    </LocationDetailBox>
                    <LocationDetailBox>
                        <p>Cloud cover</p>
                        <h3>{forecast.current.cloud}%</h3>
                    </LocationDetailBox>
                </LocationDetailGrid>
            </div>
        </div>
    );
}

const locationDetailLoader = async ({params}) => json(await WeatherApi.getForecast(params.location), {status: 200});


export default LocationDetail;
export {locationDetailLoader};